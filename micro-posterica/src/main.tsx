import "./index.scss";

import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

fetch("/environment.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load environment configuration");
    }
    return response.json();
  })
  .then((envConfig) => {
    // Set environment variables globally
    (window as any).env = envConfig;

    console.log("Environment configuration loaded:", envConfig);
    // Initialize the application
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error("Error loading environment configuration:", error);
  });
