import "./index.scss";

import App from "./App.tsx";
import { SetEnvConfig } from "./app.config.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

fetch("/environment.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load config");
    return res.json();
  })
  .then((envConfig) => {
    (window as any).env = envConfig;
    SetEnvConfig(envConfig);
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((err) => console.error("Error loading config", err));
