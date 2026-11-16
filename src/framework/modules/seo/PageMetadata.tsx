import { useEffect } from "react";
import { useLocation } from "react-router";
import { getPageSeo } from "../../../pages/pageRegistry";

function setMeta(selector: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) element.setAttribute(match[1], match[2]);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function PageMetadata() {
  const location = useLocation();
  useEffect(() => {
    const seo = getPageSeo(location.pathname);
    document.title = seo.title;
    setMeta('meta[name="description"]', seo.description);
    setMeta('meta[property="og:type"]', "website");
    setMeta('meta[property="og:title"]', seo.title);
    setMeta('meta[property="og:description"]', seo.description);
    if (seo.noIndex) setMeta('meta[name="robots"]', "noindex,follow");
    else document.head.querySelector('meta[name="robots"]')?.remove();

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = new URL(location.pathname, canonical.href).href;
      const ogUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
      if (ogUrl) ogUrl.content = canonical.href;
    }
  }, [location.pathname]);
  return null;
}
