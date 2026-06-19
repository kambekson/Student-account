declare module "virtual:pwa-register/react" {
  export function useRegisterSW(options: any): {
    offlineReady: boolean;
    needRefresh: boolean;
    updateServiceWorker: (reloadPage?: boolean) => void;
  };
}
