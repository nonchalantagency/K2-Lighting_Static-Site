import * as React from "react";
import { BrowserRouter, StaticRouter, useLocation, useRoutes } from "react-router";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { pageRegistry, toRouteObjects } from "../../../pages/pageRegistry";
import { PageMetadata } from "../seo/PageMetadata";
import { NotFound } from "../../../pages/NotFound";

const routeObjects = toRouteObjects(pageRegistry);
const routesWithFallback = [...routeObjects, { path: "*", element: <NotFound /> }];

type TransitionRouterProps = {
  routes: typeof routesWithFallback;
  config: unknown;
};
type TransitionRuntime = {
  createReactTransitionRouter?: (options: {
    React: typeof React;
    router: { useLocation: typeof useLocation; useRoutes: typeof useRoutes };
  }) => ComponentType<TransitionRouterProps>;
  initPage?: () => void;
};

declare global {
  interface Window {
    __CONFIG__?: unknown;
    __RE_TRANSITIONS__?: TransitionRuntime;
  }
}

function AppRoutes() {
  // Always resolve the ordinary route tree so the site works without the external runtime.
  const standardRoutes = useRoutes(routesWithFallback);
  const attached = useRef(false);
  const [transition, setTransition] = useState<{ Component: ComponentType<TransitionRouterProps>; config: unknown } | null>(null);

  useEffect(() => {
    const attach = () => {
      if (attached.current) return true;
      const runtime = window.__RE_TRANSITIONS__;
      const config = window.__CONFIG__;
      if (!runtime?.createReactTransitionRouter || typeof config === "undefined") return false;
      const Component = runtime.createReactTransitionRouter({
        React,
        router: { useLocation, useRoutes },
      });
      attached.current = true;
      setTransition({ Component, config });
      return true;
    };

    // The loader event handles the normal path. A short bounded retry window
    // also covers runtimes that publish their globals just after import.
    let attempts = 0;
    let interval: number | undefined;
    const check = () => {
      if (attach() || attempts >= 100) {
        if (interval !== undefined) window.clearInterval(interval);
        if (!attached.current) console.info("[RE] Runtime globals not found; standard React Router remains active.");
        return;
      }
      attempts += 1;
    };
    check();
    if (!attached.current) interval = window.setInterval(check, 100);
    window.addEventListener("re:runtime-ready", check);
    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      window.removeEventListener("re:runtime-ready", check);
    };
  }, []);

  const initCalled = useRef(false);
  useEffect(() => {
    if (!transition || initCalled.current) return;
    const frame = window.requestAnimationFrame(() => {
      if (initCalled.current) return;
      initCalled.current = true;
      window.__RE_TRANSITIONS__?.initPage?.();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [transition]);

  if (!transition) return standardRoutes;
  const TransitionController = transition.Component;
  return <TransitionController routes={routesWithFallback} config={transition.config} />;
}

function AppContent() {
  return <>
    <PageMetadata />
    <main id="site-content"><AppRoutes /></main>
  </>;
}

export function ServerApp({ url }: { url: string }) {
  return <StaticRouter location={url}><AppContent /></StaticRouter>;
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}
