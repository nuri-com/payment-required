# Catalog sources for the money agent (Sep 2026, read-only research)

## A. agents.circle.com/services (102 services, 1246 endpoints)
Pay-per-call USDC via Circle Agent Wallet (mostly Solana), x402 challenge per call, no per-service account.

| Service | Base | What | Price |
|---|---|---|---|
| CryptoRefills (1P) | solana.x402.cryptorefills.com | gift cards, mobile top-ups, eSIM | brands free, purchase USDC |
| Purch (1P) | api.purch.xyz | Amazon/Shopify search + purchase | search $0.01, shop $0.10 |
| BRIJ (1P) | travel.brij.fi | flight search + escrow booking | $0.10 |
| Agentic Reservations (1P) | agentres.dev | restaurant booking (Resy/Blackbird) | free-$3 |
| StableDomains (1P) | stabledomains.dev | domain check/register/DNS | $0.01 |
| StableEmail (1P) | stableemail.dev | agent inboxes, send/read | $1/30d inbox, $0.005 send |
| StablePhone (1P) | - | calls, SMS, numbers | per call |
| EarnFi (1P) | app.earnfi.fun | human-in-the-loop jobs | $0.165-$5.50 |
| DripStack (1P) | - | pay-per-post Substack | $0.01-0.10 |
| AIsa / Exa / Messari / Arkham / Birdeye / Allium | - | LLM gateway, search, crypto data | $0.001-0.007 |
| AgentMail / AgentPhone / Twilio / Google Maps / Tripadvisor / Tavily / Firecrawl (3P via Sponge) | - | email (48 endpoints), SMS, maps, scraping | micro |

## B. nuri.com x402 (live)
`GET https://nuri.com/api/x402` catalog. x402 v2, USDC, Base 8453 / Polygon 137 / Arbitrum 42161. Docs nuri.com/docs/x402-username-marketplace, OpenAPI nuri.com/openapi.json.
- `thanks-postcard-v1`: `POST /api/x402/postcards` (preview free, status `GET /api/x402/orders/{id}`), scheme `upto` max $3.50, payTo ENS `emino.nuri.eth`. MPP: fixed $3.50 `POST /api/mpp/postcards` (Base).

## C. Card-checkout merchants, browser-verified
| Merchant | Signup | Card | Price | Notes |
|---|---|---|---|---|
| nadanada.me | none | card + crypto | VPN $0.50, eSIM $0.99 | best first target, no wall |
| Mullvad | no email, generated account number | card | EUR 5 | agent-friendly |
| Bitrefill | optional email | crypto-first, card limited | from $5 | CF challenge on curl only |
| Porkbun | email only | Visa/MC form | $1-10 TLDs | cookie banner only |
| Airalo | email/Apple/Google | Visa/MC | from $4.50 | instant |
| Proton | email only | card | EUR 5-10 | |
| Namecheap | email only | card | $6-12 | CF JS wall on curl |
| Gumroad / Ko-fi / BMC | email, Ko-fi guest tips | Stripe forms | $1-5 | |
| Stripe test checkout | none | 4242... | $0 | training only |
| Avoid | Wolt/Glovo/Uber Eats (phone+SMS+app), Twilio (SMS), DigitalOcean (card+phone) | | | |

## D. MCP servers for the agent
Resend (API key, 100/day free), AgentMail (inboxes+send+webhooks), mail.tm (free temp inbox for OTP, no auth), StableEmail (x402), Google Calendar/Gmail MCP (OAuth), Google Maps MCP, eBay Browse API (OAuth, 5000/day), Exa/Tavily, Twilio.
