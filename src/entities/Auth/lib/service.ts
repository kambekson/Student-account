import { Auth, AuthToken } from "@/entities/Auth";
import { checkIsTokenExpired } from "@/shared/lib/utils";
import { DOMAIN_URL } from "@/shared/api/base";
import { AuthAPI } from "@/entities/Auth";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
}

enum CookieSameSite {
  lax = "lax",
  strict = "strict",
  none = "none",
}

class AuthService {
  private static readonly STORAGE_KEYS = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
  } as const;

  async login(auth: Auth): Promise<AuthToken> {
    const tokens = await AuthAPI.login(auth);
    this.saveTokensToStorage(tokens);
    this.saveTokensToCookies(tokens);
    return tokens;
  }

  async logout(): Promise<void> {
    await AuthAPI.logout();
    this.clearTokens();
  }

  async checkLogout(): Promise<boolean> {
    if (this.getCookie<boolean>("logout")) {
      this.clearTokens();
      const deleteCookieOptions = {
        path: "/",
        domain: DOMAIN_URL,
        sameSite: CookieSameSite.lax,
        secure: true,
      };
      this.deleteCookie("logout", deleteCookieOptions);
      this.deleteCookie("accessToken", deleteCookieOptions);
      this.deleteCookie("refreshToken", deleteCookieOptions);
      return true;
    }

    return false;
  }

  async checkAuth(): Promise<AuthToken> {
    try {
      const { accessToken, refreshToken } = this.getTokensFromStorage();

      if (!accessToken || !refreshToken) {
        throw new Error("No tokens found");
      }

      const decodedAccessToken = jwtDecode<TokenPayload>(accessToken);
      const decodedRefreshToken = jwtDecode<TokenPayload>(refreshToken);

      if (!checkIsTokenExpired(decodedAccessToken.exp)) {
        const authToken = { access: accessToken, refresh: refreshToken };
        this.saveTokensToCookies(authToken);
        return authToken;
      }

      if (!checkIsTokenExpired(decodedRefreshToken.exp)) {
        const newTokens = await AuthAPI.refresh(refreshToken);
        this.saveTokensToStorage(newTokens);
        this.saveTokensToCookies(newTokens);
        return newTokens;
      }

      throw new Error("Expired tokens");
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  private saveTokensToStorage(tokens: AuthToken): void {
    localStorage.setItem(AuthService.STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(
      AuthService.STORAGE_KEYS.REFRESH_TOKEN,
      tokens.refresh
    );
  }

  private saveTokensToCookies(tokens: AuthToken): void {
    const cookieOptions = `domain=.${DOMAIN_URL}; path=/; max-age=3600; secure; samesite=lax`;
    document.cookie = `${AuthService.STORAGE_KEYS.ACCESS_TOKEN}=${tokens.access}; ${cookieOptions}`;
    document.cookie = `${AuthService.STORAGE_KEYS.REFRESH_TOKEN}=${tokens.refresh}; ${cookieOptions}`;
  }

  private getCookie<T extends string | number | boolean>(
    name: string
  ): T | null {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");

      if (cookieName === name) {
        const decoded = decodeURIComponent(cookieValue);

        if (decoded === "true" || decoded === "false") {
          return (decoded === "true") as T;
        }

        const num = Number(decoded);
        if (!isNaN(num) && decoded.trim() !== "") {
          return num as T;
        }

        return decoded as T;
      }
    }

    return null;
  }

  private deleteCookie(
    name: string,
    options?: {
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: CookieSameSite;
    }
  ): void {
    let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;

    if (options?.path) {
      cookieString += `; path=${options.path}`;
    } else {
      cookieString += `; path=/`;
    }

    if (options?.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options?.secure) {
      cookieString += `; secure`;
    }

    if (options?.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  }

  private getTokensFromStorage(): {
    accessToken: string | null;
    refreshToken: string | null;
  } {
    return {
      accessToken: localStorage.getItem(AuthService.STORAGE_KEYS.ACCESS_TOKEN),
      refreshToken: localStorage.getItem(
        AuthService.STORAGE_KEYS.REFRESH_TOKEN
      ),
    };
  }

  private clearTokens(): void {
    localStorage.removeItem(AuthService.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AuthService.STORAGE_KEYS.REFRESH_TOKEN);
  }
}

const authService = new AuthService();
export default authService;
