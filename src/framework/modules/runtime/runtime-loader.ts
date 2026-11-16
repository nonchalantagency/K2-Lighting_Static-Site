// Keep this pointed at the deployed RE-Codebase bootstrap entry.
const RUNTIME_ENTRY = "https://re-codebase.pages.dev/entry.js";

async function loadRuntime() {
  if (typeof window === "undefined") return;
  try {
    await import(/* @vite-ignore */ RUNTIME_ENTRY);

    // The external entry is optional. If it did not publish both globals,
    // leave the React app running on its ordinary React Router implementation.
    if (!window.__RE_TRANSITIONS__ || typeof window.__CONFIG__ === "undefined") {
      console.info("[RE] Runtime globals not found; using standard React Router.");
    } else {
      console.info("[RE] External runtime loaded and available.");
    }
    window.dispatchEvent(new Event("re:runtime-ready"));
  } catch (error) {
    console.warn("[RE] External runtime unavailable; using standard React Router.", error);
  }
}

void loadRuntime();
