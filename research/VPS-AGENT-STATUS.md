# VPS money agent status (46.225.27.102, Sep 8 2026)

Profile `paymentrequired` (hermes -p paymentrequired), model openrouter qwen/qwen3.8-flash, mcp_servers.finance https://wirex.nuri.com/mcp enabled trust **full** (`trusted` is invalid and fails closed to untrusted). OPENROUTER_API_KEY in /root/.hermes/.env AND /root/.hermes/profiles/paymentrequired/.env (profile .env is what -p reads). SOUL = finance-bot + browser checkout paragraph. Default profile and `hermes serve` untouched.

Browser: `agent-browser` (npm -g) + Chrome for Testing 152 at /root/.agent-browser/browsers/chrome-152.0.7977.82, /usr/local/bin/chromium symlink. Hermes 0.21 browser.backend defaults to browser-use (browser_exec via terminal); agent drives Chromium through agent-browser.

Smoke: tools listed 15s; connect_wallet -> real link 14s; Bitrefill first 3 products (Amazon.de, Rewe, Lieferando) via curl fallback (Cloudflare blocks agent-browser); Stripe demo form fill works mechanically, but the oneshot agent loop timed out twice (285s/274s) on the full fill+submit task.

Models: spark-1.3 best overall (b 21s, c 71s, concise). qwen3.8-flash best debugger (self-fixed trust bug), verbose, c 130-160s. glm-5.3-flash least reliable (first b 203s timeout).

Reproduce: `hermes -p paymentrequired chat -q "<prompt>" --oneshot -Q`.
Open: oneshot budget too small for multi-step checkout; Cloudflare on Bitrefill; needs email inbox (mail.tm / AgentMail) + phone (StablePhone) for signups.
