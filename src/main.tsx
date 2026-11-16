import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.scss";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Could not find the React root element.");

const app = <StrictMode><App /></StrictMode>;

// Prerendered production HTML is hydrated; the empty Vite dev root is mounted.
if (rootElement.hasChildNodes()) hydrateRoot(rootElement, app);
else createRoot(rootElement).render(app);
