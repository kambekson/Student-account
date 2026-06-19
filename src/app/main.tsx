import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BASENAME } from "@/shared/api/base";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const storageKey = "i18nextLng";

if (!localStorage.getItem(storageKey)) {
  localStorage.setItem(storageKey, "kk");
}

async function main() {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={BASENAME && BASENAME !== "/" ? `/${BASENAME.replace(/^\//, "")}` : ""}>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

main();
