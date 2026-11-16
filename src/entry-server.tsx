import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { ServerApp } from "./App";
import { getPageSeo, prerenderPaths } from "./pages/pageRegistry";

export function render(url: string) {
  return renderToString(<StrictMode><ServerApp url={url} /></StrictMode>);
}
export { getPageSeo, prerenderPaths };
