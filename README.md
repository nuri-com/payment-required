# PaymentRequired

Retail-first agent wallet, card and banking website. Hosted on GitHub Pages with custom domain `paymentrequired.com`.

## Versions

- `/` — original pixel-style page, preserved while V2 is reviewed. Its historical marketing examples are not verified fulfillment receipts.
- `/v2/` — minimalist light preview in English, German, Spanish, French and Swahili. Every locale is a static readable one-pager; no client-side translation dependency. Mainstream entry first, everyday examples next, native MCP/CLI/API setup below.

## What is actually connected

The web chat uses the existing `chat-client.mjs`, which initializes `https://wirex.nuri.com/mcp`, discovers current tools and uses the server-side model proxy at `/chat/api/llm`. This is a real MCP conversation, not a scripted funnel. No provider key is shipped in website JavaScript.

The checked endpoint is a **sandbox**. Tool presence is not proof of live card purchases, payout availability, KYC completion or merchant fulfillment. Wallet self-custody is distinct from banking partners' card/fiat restrictions. V2 does not use an approval iframe or infer success from a window closing.

No public enrollment endpoints for Telegram, WhatsApp, iMessage, Signal or email have been verified for V2. Those buttons disclose availability and offer the web chat / existing-agent setup instead of linking to fictitious handles. Six consumer tasks are example prompts, not automated purchase confirmations.

## Edit and check V2

Only Python stdlib is required to build the static pages:

```sh
python3 scripts/build-v2.py
python3 scripts/test-v2.py
python3 -m http.server 8948 --bind 127.0.0.1
```

Sources: `v2/content.json`, `v2/site.css`, `v2/app.mjs`. Generated: `v2/index.html`, locale directories, Markdown counterparts, sitemap and `llms-full.txt`.

Browser verification uses an installed Playwright (no production dependency):

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs \
  node scripts/check-v2.mjs http://127.0.0.1:8948/v2/ /tmp/v2-browser-proof

# Real no-payment MCP discovery + LLM answer:
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs \
  node scripts/live-v2.mjs http://127.0.0.1:8948/v2/ /tmp/v2-live-proof
```

Tests cover 320/390/1440/3840px, minimum 17px text, all locales, no-JS readability, channel dialog/keyboard controls, example filling without submitting, tabs and real clipboard contents. Browser credentials, real payments and KYC are not exercised by those tests.

## Agent discovery

`robots.txt`, sitemap/hreflang, `llms.txt`, `llms-full.txt`, per-language Markdown, `auth.md`, a truthful external MCP server card, ARD catalogue and setup skill are shipped. Native WebMCP, when supported by the browser, exposes public setup/capability reads only; no signing or account access.

[Integration guide](v2/integration.md) · [Dated capability snapshot](v2/capabilities.json) · [MCP usability feedback](research/V2-MCP-USABILITY.md).

## Audits and hosting limits

```sh
python3 scripts/audit-v2.py --url https://paymentrequired.com/v2/ --out /tmp/v2-public-audit
```

This runs isitagentready, Circle Seller Readiness, Is Agentic and both PageSpeed strategies, preserving raw failures. GitHub Pages cannot implement dynamic `Accept: text/markdown` negotiation, custom Link/RateLimit headers or path-specific JSON errors. V2 is not a paid merchant endpoint, OAuth issuer or A2A service. Never invent those capabilities to improve a score. A full 100/100 agent-readiness claim remains blocked by any unresolved hosting, external or scoring requirement; local Lighthouse is not a substitute for public PSI reports.

## Deployment

GitHub Pages serves `main` at the repository root. Keep `CNAME` = `paymentrequired.com`, HTTPS enforced. `.nojekyll` allows static `.well-known` metadata. V2 publication adds `/v2/`; it does not replace the homepage or modify the financial backend. Before merging, independently review, build/test, then verify the exact live target and all generated locale paths.
