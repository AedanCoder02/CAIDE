// Visitor consent for optional tracking. Stored only on the visitor's device
// (localStorage), never sent anywhere. Essential storage (this record) needs
// no consent; analytics and marketing stay off until the visitor opts in.

export type Consent = { analytics: boolean; marketing: boolean };
type Stored = Consent & { v: 1; at: string };

const KEY = "caide-consent";
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // ask again after 12 months
export const OPEN_EVENT = "caide:consent-open";
export const CHANGE_EVENT = "caide:consent";

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Stored;
    if (s.v !== 1 || Date.now() - Date.parse(s.at) > MAX_AGE_MS) return null;
    return { analytics: !!s.analytics, marketing: !!s.marketing };
  } catch {
    return null;
  }
}

export function writeConsent(c: Consent) {
  try {
    const s: Stored = { v: 1, at: new Date().toISOString(), ...c };
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE_EVENT, { detail: c }));
}

export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));

// Cloudflare Web Analytics: cookieless. Loaded only after analytics consent,
// and only when a site token is configured at build time.
const CF_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? "";
let analyticsLoaded = false;

export function applyConsent(c: Consent) {
  if (c.analytics && CF_TOKEN && !analyticsLoaded) {
    const s = document.createElement("script");
    s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_TOKEN }));
    document.head.appendChild(s);
    analyticsLoaded = true;
  } else if (!c.analytics && analyticsLoaded) {
    // A loaded script cannot be unloaded; reload so it is gone.
    window.location.reload();
  }
  // Marketing: no tags are used today. Add any future ad/conversion tag here,
  // behind `marketing`, and list it in the Cookie Policy first. A Global
  // Privacy Control signal always counts as a refusal.
  const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  const marketing = c.marketing && !gpc;
  void marketing;
}
