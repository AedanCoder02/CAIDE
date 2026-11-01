// CAIDE edge Worker: serves the static site (Workers static assets) and
// handles POST /api/lead, the project brief form. Everything optional is
// switched on by bindings/secrets in wrangler.jsonc, so it degrades safely.

// Minimal shapes of the Cloudflare bindings used here (kept local so the
// project needs no extra type packages).
type Fetcher = { fetch: (req: Request) => Promise<Response> };
type D1 = { prepare: (sql: string) => { bind: (...v: unknown[]) => { run: () => Promise<unknown> } } };
type SendEmail = {
  send: (m: { to: string; from: { email: string; name?: string }; replyTo?: string; subject: string; text: string }) => Promise<{ messageId: string }>;
};

type RateLimit = { limit: (o: { key: string }) => Promise<{ success: boolean }> };

interface Env {
  ASSETS: Fetcher;
  LEAD_LIMIT?: RateLimit;
  ALLOWED_ORIGIN?: string;
  LEAD_FROM?: string;
  LEAD_TO?: string;
  TURNSTILE_SECRET?: string;
  EMAIL?: SendEmail;
  DB?: D1;
}

const MAX_BODY = 16_000; // bytes
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SECURITY_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: SECURITY_HEADERS });

// Trim, drop control characters (blocks header injection in the subject) and cap length.
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "";
// Same, but keeps line breaks for the free-text idea field.
const cleanText = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, " ").trim().slice(0, max) : "";
const list = (v: unknown, n: number, max: number) =>
  Array.isArray(v) ? v.slice(0, n).map((x) => clean(x, max)).filter(Boolean) : [];

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  if (!token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const out = (await res.json()) as { success?: boolean };
  return out.success === true;
}

async function handleLead(req: Request, env: Env): Promise<Response> {
  if (req.method !== "POST") return json(405, { ok: false, error: "method" });

  // Only accept JSON from the site's own pages.
  const origin = req.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN || new URL(req.url).origin;
  if (origin !== allowed) return json(403, { ok: false, error: "origin" });
  if (!(req.headers.get("Content-Type") || "").startsWith("application/json")) return json(415, { ok: false, error: "type" });

  if (env.LEAD_LIMIT) {
    const { success } = await env.LEAD_LIMIT.limit({ key: req.headers.get("CF-Connecting-IP") || "unknown" });
    if (!success) return json(429, { ok: false, error: "rate" });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: "size" });
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "json" });
  }

  // Honeypot: real visitors never fill it. Pretend success.
  if (clean(b.company, 200)) return json(200, { ok: true });

  const lead = {
    name: clean(b.name, 120),
    email: clean(b.email, 200),
    phone: clean(b.phone, 40),
    prefer: clean(b.prefer, 60),
    business: clean(b.business, 120),
    industry: clean(b.industry, 80),
    location: clean(b.location, 120),
    site: clean(b.site, 200),
    needs: list(b.needs, 12, 80),
    timeline: clean(b.timeline, 80),
    brand: clean(b.brand, 80),
    budget: clean(b.budget, 80),
    idea: cleanText(b.idea, 2000),
    locale: clean(b.locale, 10),
    updates: b.updates === true,
  };
  if (!lead.name || !EMAIL_RE.test(lead.email) || b.consent !== true) return json(422, { ok: false, error: "fields" });

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET, clean(b.turnstile, 2048), req.headers.get("CF-Connecting-IP"));
    if (!ok) return json(403, { ok: false, error: "turnstile" });
  }

  if (!env.EMAIL && !env.DB) return json(503, { ok: false, error: "unconfigured" });

  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  if (env.DB) {
    await env.DB.prepare(
      "INSERT INTO leads (id, created_at, locale, name, email, phone, prefer, business, industry, location, site, needs, timeline, brand, budget, idea, updates, consent_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    )
      .bind(id, now, lead.locale, lead.name, lead.email, lead.phone, lead.prefer, lead.business, lead.industry, lead.location, lead.site, lead.needs.join(", "), lead.timeline, lead.brand, lead.budget, lead.idea, lead.updates ? 1 : 0, now)
      .run();
  }

  if (env.EMAIL && env.LEAD_TO && env.LEAD_FROM) {
    const rows: [string, string][] = [
      ["Name", lead.name],
      ["Email", lead.email],
      ["Phone", lead.phone],
      ["Prefers", lead.prefer],
      ["Business", lead.business],
      ["Industry", lead.industry],
      ["Location", lead.location],
      ["Current site", lead.site],
      ["Needs", lead.needs.join(", ")],
      ["Timeline", lead.timeline],
      ["Brand", lead.brand],
      ["Budget", lead.budget],
      ["Language", lead.locale],
      ["Wants updates", lead.updates ? "yes" : "no"],
    ];
    const text = `${rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nIdea:\n${lead.idea}\n\nBrief ${id} · ${now}`;
    await env.EMAIL.send({
      to: env.LEAD_TO,
      from: { email: env.LEAD_FROM, name: "CAIDE briefs" },
      replyTo: lead.email,
      subject: `New brief: ${lead.business || lead.name}`.slice(0, 150),
      text,
    });
  }

  return json(200, { ok: true });
}

const worker = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(req.url);
    if (pathname === "/api/lead") {
      try {
        return await handleLead(req, env);
      } catch {
        return json(500, { ok: false, error: "server" });
      }
    }
    if (pathname.startsWith("/api/")) return json(404, { ok: false, error: "not_found" });
    return env.ASSETS.fetch(req);
  },
};

export default worker;
