-- Apply with: npx wrangler d1 execute caide-leads --remote --file=worker/schema.sql
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  locale TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  prefer TEXT,
  business TEXT,
  industry TEXT,
  location TEXT,
  site TEXT,
  needs TEXT,
  timeline TEXT,
  brand TEXT,
  budget TEXT,
  idea TEXT,
  updates INTEGER NOT NULL DEFAULT 0,
  consent_at TEXT NOT NULL
);
-- Retention: enquiries are deleted 24 months after the last exchange.
-- npx wrangler d1 execute caide-leads --remote --command "DELETE FROM leads WHERE created_at < datetime('now','-24 months')"
