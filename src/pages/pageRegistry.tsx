import type { ComponentType } from "react";
import { HomePage } from "./home/Home";
import { AboutPage } from "./about/About";
import { WorkPage } from "./work/Work";

export type PageSeo = {
  title: string;
  description: string;
  noIndex?: boolean;
};

export type PageDefinition = {
  path: string;
  component: ComponentType;
  label: string;
  seo: PageSeo;
};

// Add, remove, or edit pages here. This registry drives routing, prerendering and SEO.
export const pageRegistry: PageDefinition[] = [
  {
    path: "/",
    component: HomePage,
    label: "Home",
    seo: { title: "Home | Your Site", description: "A short description of your website." },
  },
  {
    path: "/about",
    component: AboutPage,
    label: "About",
    seo: { title: "About | Your Site", description: "About this business or project." },
  },
  {
    path: "/work",
    component: WorkPage,
    label: "Work",
    seo: { title: "Work | Your Site", description: "Selected projects and work." },
  },
];

export function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

export function getPageDefinition(pathname: string) {
  const path = normalizePath(pathname);
  return pageRegistry.find((page) => page.path === path);
}

export function getPageSeo(pathname: string): PageSeo {
  return getPageDefinition(pathname)?.seo ?? {
    title: "Page not found | Your Site",
    description: "The page you are looking for could not be found.",
    noIndex: true,
  };
}

export function toRouteObjects(registry: PageDefinition[]) {
  return registry.map(({ path, component: Page }) => ({ path, element: <Page /> }));
}

export const prerenderPaths = pageRegistry.map((page) => page.path);
