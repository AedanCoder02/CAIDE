# Cloudflare setup (free plan, no domain)

The site runs as one Cloudflare Worker named `caide`. It serves the static export in `out/` and handles the project brief form at `/api/lead` (`worker/index.ts`). The free address is `https://caide.<your-subdomain>.workers.dev`. A custom domain can be added later without rebuilding anything.

Already set up in the Cloudflare account:
- The D1 database `caide-leads`, with the `leads` table from `worker/schema.sql`. It is bound as `DB` in `wrangler.jsonc`.

What ships in this repo:
- A rate limit of 5 briefs per minute per IP (`LEAD_LIMIT`).
- An origin check, input validation, and a honeypot field on the form.
- Security headers in `public/_headers`.

## 1. Connect the repo (one time, about 3 minutes)
1. In the Cloudflare dashboard, go to **Workers & Pages**, then **Create application**, then **Import a repository**. Connect GitHub and pick `AedanCoder02/CAIDE`.
2. Set the project name to `caide`. It must match `name` in `wrangler.jsonc`.
3. Set the build command to `npm run build:cf` and the deploy command to `npx wrangler deploy`.
4. Deploy. Every push to `main` now deploys to Cloudflare, and GitHub Pages keeps deploying too.
5. Copy the `*.workers.dev` URL. Under **Settings**, then **Build**, then **Variables**, add `NEXT_PUBLIC_SITE_URL` with that URL and no trailing slash. Then redeploy, so share previews and links use the new address.

## 2. Read briefs
Go to **Storage & Databases**, then **D1**, then `caide-leads`, then **Console**:
```
SELECT created_at, name, email, phone, business, needs, budget, idea FROM leads ORDER BY created_at DESC;
```
Retention: delete briefs after 24 months.
```
DELETE FROM leads WHERE created_at < datetime('now','-24 months');
```

## 3. Optional, free
- **Analytics:** in **Web Analytics**, add the site and use the manual JS snippet. Put only the token in the build variable `NEXT_PUBLIC_CF_BEACON_TOKEN`. Do not use automatic injection, because it would load analytics before consent.
- **Turnstile:** in **Turnstile**, add a widget for the workers.dev hostname in Managed mode, with pre-clearance off. Put the site key in the build variable `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, and put the secret in the Worker secret `TURNSTILE_SECRET`.

## Later: custom domain (about $10/year on Cloudflare Registrar)
1. Register the domain or add it to Cloudflare, then add it under the Worker's **Domains & Routes**.
2. Set `ALLOWED_ORIGIN` and `NEXT_PUBLIC_SITE_URL` to the new domain.
3. To get each brief by email:
   - Go to **Email Service**, then **Email Routing**, and verify your inbox.
   - Uncomment `send_email` in `wrangler.jsonc`, and set `LEAD_FROM` and `LEAD_TO`.
   - Replace `hello@caide.dev` across the site with the real inbox.
4. Zone security, all free:
   - SSL **Full (strict)** and **Always Use HTTPS**.
   - **Bot Fight Mode**.
   - One WAF rate-limit rule on `/api/lead`.
   - **DNSSEC**.
   - A DMARC record.

## Local test
```
npm run build:cf
npx wrangler d1 execute caide-leads --local --file=worker/schema.sql
npx wrangler dev
```
