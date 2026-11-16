// Optional bridge for an externally-managed Barba lifecycle.
// The external runtime calls mount/unmount with the active Barba container.
import { StrictMode, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import { pageRegistry } from "../../../pages/pageRegistry";

const roots = new WeakMap<HTMLElement, Root>();
const pagesByKey = new Map(pageRegistry.map((page) => [page.path, page] as const));

function resolveContainer(element: HTMLElement) {
  return element.matches('[data-barba="container"]')
    ? element
    : element.closest<HTMLElement>('[data-barba="container"]');
}

function mount(container: HTMLElement) {
  const barbaContainer = resolveContainer(container);
  if (!barbaContainer || roots.has(barbaContainer)) return;
  const pageKey = barbaContainer.dataset.page;
  const page = pageKey ? pagesByKey.get(pageKey) : undefined;
  const rootElement = barbaContainer.querySelector<HTMLElement>("#root");
  if (!page || !rootElement) {
    console.warn("[RE BARBA] Could not resolve registered page or #root", { pageKey, rootElement });
    return;
  }
  const root = createRoot(rootElement);
  roots.set(barbaContainer, root);
  flushSync(() => root.render(<StrictMode>{createElement(page.component)}</StrictMode>));
}

function unmount(container: HTMLElement) {
  const barbaContainer = resolveContainer(container);
  if (!barbaContainer) return;
  const root = roots.get(barbaContainer);
  if (!root) return;
  flushSync(() => root.unmount());
  roots.delete(barbaContainer);
}

declare global {
  interface Window {
    __REACT_BARBA__?: { mount: typeof mount; unmount: typeof unmount };
  }
}

export function registerReactBarba() {
  window.__REACT_BARBA__ = { mount, unmount };
  const initial = document.querySelector<HTMLElement>('[data-barba="container"]');
  if (initial) mount(initial);
}
