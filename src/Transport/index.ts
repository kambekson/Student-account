import { OpenAPIClientAxios } from 'openapi-client-axios/client';
import authService from "@/Domain/Service/Auth";
import { Client, Error } from 'types/openapi';
import definition from './openapi.yaml';
import { AxiosResponse, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { InformationSystemError } from '@/Common/Entity/Base/Error';

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const DOMAIN_URL = import.meta.env.VITE_APP_DOMAIN_URL;
export const REDIRECT_URL = import.meta.env.VITE_APP_REDIRECT_URL;
export const RECOVERY_REDIRECT_URL = import.meta.env.VITE_APP_RECOVERY_REDIRECT_URL;
export const BASENAME = import.meta.env.VITE_APP_BASENAME || "/";
export const MODE = import.meta.env.MODE || "/";

let client: Client | null = null;
let isRefreshing = false;
let clientInitPromise: Promise<Client> | null = null;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const initApiClient = async () => {
  if (clientInitPromise) return clientInitPromise;

  clientInitPromise = (async () => {
    const apiOptions = {
      definition: definition as any,
      axiosConfigDefaults: {
        baseURL: BASE_URL,
        withCredentials: false,
      },
    };

    const api = new OpenAPIClientAxios(apiOptions);
    const initializedClient = await api.getClient<Client>();

    api.client.interceptors.request.use(
      function (config) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers!.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    api.client.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;

        const e = error.response?.data as Error
        const apiError = new InformationSystemError(
          e.code || 0,
          e.message || "",
          e.details,
          e.subcode,
        )

        if (error.response?.status !== HttpStatusCode.Unauthorized || originalRequest._retry) {
          return Promise.reject(apiError);
        }

        originalRequest._retry = true;

        const isRefreshRequest = error.config.url.includes("/refresh");
        if (isRefreshRequest) {
          return Promise.reject(error);
        }

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await authService.checkAuth();

            processQueue(null, response.access);

            originalRequest.headers.Authorization = `Bearer ${response.access}`;
            return api.client(originalRequest);
          } catch (e) {
            processQueue(e, null);
            return Promise.reject(e);
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api.client(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
        return Promise.reject(error);
      }
    );

    client = initializedClient;
    return client;
  })();

  return clientInitPromise;
};

export const getClient = async () => {
  if (!client) {
    await initApiClient();
  }
  return client!;
};

const transport = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const client = await getClient();
    return client.api.client.get<T>(url, config);
  },
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const client = await getClient();
    return client.api.client.post<T>(url, data, config);
  },
  patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const client = await getClient();
    return client.api.client.patch<T>(url, data, config);
  },
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const client = await getClient();
    return client.api.client.put<T>(url, data, config);
  },
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const client = await getClient();
    return client.api.client.delete<T>(url, config);
  },
};

export default transport;