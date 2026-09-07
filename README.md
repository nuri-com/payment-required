# payment-required

Landing page for **paymentrequired.com** — retail agent payments on top of the Wirex BaaS stack (wirex.nuri.com).

## Why

HTTP 402 "Payment Required" was reserved in the web spec for 30 years. We ship it: a non-custodial wallet, stablecoins, cards, IBAN banking, remittance corridors, x402 micropayments and MPP — all operated through an agent in chat (WhatsApp/Telegram/Signal or on-page) or added to any existing agent via one MCP URL.

## What's here

- `index.html` — single-page site, zero build step, hosted on GitHub Pages.
- On-page onboarding chat (language → country → non-custodial wallet explainer → handoff to https://wirex.nuri.com/chat/ for the real passkey wallet connect). The live chat backend sends `X-Frame-Options: DENY` and no CORS allow-origin, so the landing chat is a scripted funnel, not the live agent — swap in the real API once CORS for this origin is enabled.
- "Copy prompt" MCP block pointing agents at `https://wirex.nuri.com/mcp`.

## Deploy

GitHub Pages from `main` / root. Point `paymentrequired.com` CNAME here when ready.
