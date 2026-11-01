"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import en, { type Dict } from "./en";
import { LOCALE_INFO, LOCALES, detectLocale, localeHref, pathLocale, type Locale } from "./config";

const loaders: Record<Exclude<Locale, "en">, () => Promise<{ default: Dict }>> = {
  es: () => import("./es"),
  "pt-BR": () => import("./pt-BR"),
  pt: () => import("./pt"),
  fr: () => import("./fr"),
  it: () => import("./it"),
  de: () => import("./de"),
  ja: () => import("./ja"),
  zh: () => import("./zh"),
};

type Ctx = { locale: Locale; t: Dict; setLocale: (l: Locale) => void };
const LangContext = createContext<Ctx>({ locale: "en", t: en, setLocale: () => {} });

const isLocale = (l: string): l is Locale => (LOCALES as readonly string[]).includes(l);

// Home pages live at "/" (detects on the device) and "/xx/" (fixed language).
const isHomePath = (p: string) => pathLocale(p) !== null || !/\/(privacy|terms|cookies)\/?$/.test(p);

export function LangProvider({ children, initial }: { children: React.ReactNode; initial?: { locale: Locale; t: Dict } }) {
  const [state, setState] = useState<{ locale: Locale; t: Dict }>(initial ?? { locale: "en", t: en });
  const lastTitle = useRef(initial?.t.meta.title ?? "");

  const apply = useCallback(async (l: Locale, moveUrl: boolean) => {
    const t = l === "en" ? en : (await loaders[l]()).default;
    setState({ locale: l, t });
    const root = document.documentElement;
    root.lang = LOCALE_INFO[l].html;
    root.removeAttribute("data-i18n");
    // On a home page, the address carries the language so a shared link opens in it.
    const { pathname, hash } = window.location;
    if (moveUrl && isHomePath(pathname)) window.history.replaceState(window.history.state, "", localeHref(pathname, l) + hash);
  }, []);

  useEffect(() => {
    if (initial) return;
    const l = detectLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- locale comes from the browser (external), applied once after hydration
    if (isLocale(l) && l !== "en") apply(l, true).catch(() => document.documentElement.removeAttribute("data-i18n"));
    else document.documentElement.removeAttribute("data-i18n");
  }, [apply, initial]);

  // Set after commit so Next's own <title> handling doesn't overwrite it.
  useEffect(() => {
    const want = state.t.meta.title;
    // Only the home page uses the shared title; legal pages keep their own.
    const sync = () => {
      const cur = document.title;
      if (cur !== want && (cur === en.meta.title || cur === lastTitle.current)) {
        document.title = want;
        lastTitle.current = want;
      }
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, [state]);

  const setLocale = useCallback((l: Locale) => void apply(l, true), [apply]);

  return <LangContext.Provider value={{ ...state, setLocale }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;
