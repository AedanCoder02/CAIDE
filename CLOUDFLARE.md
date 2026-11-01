# Cloudflare setup (free plan)

The site deploys as a Cloudflare Worker with static assets: the static export in `out/` plus a small Worker (`worker/index.ts`) for the project brief form at `/api/lead`. Everything below fits the free plan. GitHub Pages keeps working in parallel until you switch DNS.

## 1. Add the domain
1. Create a free Cloudflare account and **Add a domain**. Choose the **Free** plan.
2. At your registrar, change the nameservers to the two Cloudflare gives you. Wait until the domain shows **Active**.
3. In **SSL/TLS**, set the mode to **Full (strict)**, and turn on **Always Use HTTPS**.

## 2. Edit `wrangler.jsonc`
- Set `ALLOWED_ORIGIN` to `https://<your-domain>`.
- Set `LEAD_FROM` (any address on your domain, for example `briefs@<your-domain>`).
- Set `LEAD_TO` to your real inbox.
- Replace `hello@caide.dev` across the site with the real inbox.

## 3. Deploy from GitHub (Workers Builds)
1. Go to **Workers & Pages**, select **Create**, then **Import a repository**, and pick `AedanCoder02/CAIDE`.
2. Build command: `npm run build:cf`. Deploy command: `npx wrangler deploy`.
3. Add these build variables:
   - `NEXT_PUBLIC_SITE_URL=https://<your-domain>`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (from step 5)
   - `NEXT_PUBLIC_CF_BEACON_TOKEN` (from step 6)
4. On the Worker's **Settings**, then **Domains & Routes**, add your domain as a **Custom domain**.

## 4. Brief inbox (Email Routing, free)
1. Go to **Email Service**, then **Email Routing**. Add your real inbox as a **destination address** and verify it.
2. In `wrangler.jsonc`, uncomment the `send_email` binding and set `destination_address` to that inbox.

Sending to a verified destination address is free.

## 5. Spam protection (Turnstile, free)
1. Go to **Turnstile**, then **Add widget**. Set the hostname to your domain and the mode to **Managed**. Leave pre-clearance off, so no cookie is set.
2. Put the site key in the `NEXT_PUBLIC_TURNSTILE_SITE_KEY` build variable.
3. Put the secret in the Worker with `npx wrangler secret put TURNSTILE_SECRET`, or under **Settings**, then **Variables and Secrets**. Never commit it.

## 6. Analytics (Web Analytics, free, consent-gated)
1. Go to **Web Analytics** and add the site. Use the **manual JS snippet** option, and copy only the token into `NEXT_PUBLIC_CF_BEACON_TOKEN`.
2. Do **not** enable automatic injection. Automatic injection would load analytics before consent. The site loads the beacon itself, and only after the visitor accepts.

## 7. Optional: keep briefs in a database (D1, free tier)
```
npx wrangler d1 create caide-leads
npx wrangler d1 execute caide-leads --remote --file=worker/schema.sql
```
Paste the database id into the commented `d1_databases` block in `wrangler.jsonc`. The 24-month retention delete command is in `worker/schema.sql`.

## 8. Security settings (dashboard, free)
- **Security**, then **Bots**: turn on **Bot Fight Mode**.
- **Security**, then **WAF**, then **Rate limiting rules**: on the free plan you get one rule. Example: path equals `/api/lead`, 5 requests per 10 seconds per IP, action Block.
- **SSL/TLS**, then **Edge Certificates**: Minimum TLS 1.2, HSTS on (already sent by `_headers`), Automatic HTTPS Rewrites on.
- **DNS**: turn on **DNSSEC** and add the DS record at your registrar.
- **Email**: once Email Routing is set up, add a DMARC record such as `v=DMARC1; p=quarantine`.

Security headers (CSP, HSTS, frame blocking, nosniff, Referrer-Policy, Permissions-Policy) ship in `public/_headers`. The Worker adds the same headers to API responses.

## Local test
```
npm run build:cf && npx wrangler dev --var ALLOWED_ORIGIN:http://localhost:8787
```
