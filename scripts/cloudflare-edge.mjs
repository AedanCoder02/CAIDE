#!/usr/bin/env node
// Applies the CAIDE edge-security baseline to one Cloudflare zone (Free plan limits):
//   - Free Managed Ruleset (http_request_firewall_managed)
//   - up to 5 WAF custom rules: SQLi, XSS, path probes, methods, empty user agent on the API
//   - 1 rate-limiting rule on POST /api/* (10 s period, Block 10 s)
//   - SSL Full (strict), Always Use HTTPS, minimum TLS 1.2
// Bot Fight Mode is a dashboard toggle (Security > Settings > Bot traffic) and is not set here.
//
// Each phase entry point is replaced with exactly these rules, so rules added by hand in the
// dashboard for these phases are removed. The script prints what it will replace first.
//
// Usage: CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ZONE_ID=... node scripts/cloudflare-edge.mjs [--apply]
// Without --apply it only prints the current and planned rules.
// Token permissions: Zone WAF Edit, Zone Settings Edit (scoped to the one zone).

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ZONE = process.env.CLOUDFLARE_ZONE_ID;
const API_PREFIX = process.env.EDGE_API_PREFIX || "/api/";
const APPLY = process.argv.includes("--apply");

if (!TOKEN || !ZONE) {
  console.error("CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID are required.");
  process.exit(1);
}

const BASE = `https://api.cloudflare.com/client/v4/zones/${ZONE}`;

async function cf(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (res.status === 404 && method === "GET") return null;
  if (!res.ok || json.success === false) {
    throw new Error(`${method} ${path} -> ${res.status}: ${JSON.stringify(json.errors || json)}`);
  }
  return json.result;
}

const q = 'lower(http.request.uri.query)';
const any = (field, needles) => needles.map((n) => `${field} contains ${JSON.stringify(n)}`).join(" or ");

const CUSTOM_RULES = [
  {
    ref: "caide_block_sqli_query",
    description: "Block common SQL injection strings in the query string",
    action: "block",
    expression: `(${any(q, ["union select", "union%20select", "union+select", "information_schema", "sleep(", "sleep%28", "benchmark(", "' or '1'='1", "%27%20or%20", "%27+or+", "; drop ", "%3b%20drop"])})`,
  },
  {
    ref: "caide_block_xss_query",
    description: "Block common XSS payloads in the query string",
    action: "block",
    expression: `(${any(q, ["<script", "%3cscript", "javascript:", "javascript%3a", "onerror=", "onerror%3d", "onload=", "onload%3d", "<svg", "%3csvg", "<iframe", "%3ciframe"])})`,
  },
  {
    ref: "caide_block_path_probes",
    description: "Block path traversal and common vulnerability probes",
    action: "block",
    expression:
      '(http.request.uri.path contains "../" or http.request.uri.path contains "/.env" or http.request.uri.path contains "/.git/" ' +
      'or starts_with(http.request.uri.path, "/wp-") or http.request.uri.path eq "/xmlrpc.php" ' +
      'or http.request.uri.path contains "phpmyadmin" or starts_with(http.request.uri.path, "/cgi-bin") ' +
      `or ${q} contains "%2e%2e%2f" or ${q} contains "../")`,
  },
  {
    ref: "caide_block_methods",
    description: "Block HTTP methods the site does not use",
    action: "block",
    expression: 'not (http.request.method in {"GET" "HEAD" "POST" "OPTIONS"})',
  },
  {
    ref: "caide_block_api_no_ua",
    description: "Block API requests without a user agent",
    action: "block",
    expression: `(starts_with(http.request.uri.path, ${JSON.stringify(API_PREFIX)}) and http.user_agent eq "")`,
  },
];

const RATE_RULE = {
  ref: "caide_ratelimit_api_post",
  description: `Rate limit POST ${API_PREFIX}* per IP`,
  action: "block",
  expression: `(starts_with(http.request.uri.path, ${JSON.stringify(API_PREFIX)}) and http.request.method eq "POST")`,
  ratelimit: { characteristics: ["cf.colo.id", "ip.src"], period: 10, requests_per_period: 5, mitigation_timeout: 10 },
};

const SETTINGS = [
  ["ssl", "strict"],
  ["always_use_https", "on"],
  ["min_tls_version", "1.2"],
];

async function freeManagedRulesetId() {
  const list = await cf("GET", "/rulesets");
  const hit = (list || []).find((r) => r.kind === "managed" && r.phase === "http_request_firewall_managed" && /free/i.test(r.name));
  if (!hit) throw new Error("Free Managed Ruleset not found in this zone's ruleset list.");
  return hit;
}

async function plan(phase, rules) {
  const current = await cf("GET", `/rulesets/phases/${phase}/entrypoint`);
  const existing = current?.rules || [];
  console.log(`\n[${phase}] currently ${existing.length} rule(s):`);
  for (const r of existing) console.log(`  - ${r.description || r.ref || r.id} (${r.action})`);
  console.log(`[${phase}] will be set to ${rules.length} rule(s):`);
  for (const r of rules) console.log(`  + ${r.description} (${r.action})`);
  if (APPLY) {
    await cf("PUT", `/rulesets/phases/${phase}/entrypoint`, { rules });
    console.log(`[${phase}] applied.`);
  }
}

const managed = await freeManagedRulesetId();
console.log(`Free Managed Ruleset: ${managed.name} (${managed.id})`);

await plan("http_request_firewall_managed", [
  { ref: "caide_free_managed", description: `Execute ${managed.name}`, action: "execute", expression: "true", action_parameters: { id: managed.id } },
]);
await plan("http_request_firewall_custom", CUSTOM_RULES);
await plan("http_ratelimit", [RATE_RULE]);

console.log("");
for (const [id, value] of SETTINGS) {
  const cur = await cf("GET", `/settings/${id}`);
  console.log(`[setting] ${id}: ${cur?.value} -> ${value}`);
  if (APPLY && cur?.value !== value) await cf("PATCH", `/settings/${id}`, { value });
}

console.log(APPLY ? "\nDone. Turn on Bot Fight Mode in Security > Settings > Bot traffic." : "\nDry run only. Re-run with --apply to change the zone.");
