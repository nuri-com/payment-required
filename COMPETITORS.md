# Competitive landscape (Sep 2026)

## A. Real financial instruments for agents (cards, bank accounts, IBAN/ACH)

| Name | URL | Real cards? | Real bank / IBAN-ACH? | Crypto? | Retail? | Difference vs us |
|---|---|---|---|---|---|---|
| **Natural** | natural.com | via partners | FDIC fiat wallets, US ACH only | No | No, B2B/dev, $30M A | Closest on substance. Custodial, US-only, no IBAN/SEPA, no user-owned keys |
| **Catena Labs** | catena.com | not primary | custodial deposits, seeking NY trust charter | Yes, stablecoin-first | No, B2B private access | Business agents; custodial |
| **Mercury** | mercury.com | Yes, "agent cards" | US business checking, ACH/wire | No | No, B2B startups | Only mainstream player shipping named agent cards, but businesses only, US only |
| Payman | paymanai.com | executes on your rails | routes over your existing accounts | No | No, B2B SDK/MCP | Issues nothing of its own |
| Ramp / Brex | ramp.com | corp cards + Policy Agent | corporate accounts | No | No | Spend management on company cards |
| Signets | signets.ai | delegated virtual cards | delegated US bank accounts | No | No, B2B2C | Custodial, delegated to users' agents |
| Lithic | lithic.com | agentic virtual cards | No | No | dev infra | Embed-only |
| Marqeta | marqeta.com | MCP card issuance | No | No | dev infra | You build on top |
| Stripe Issuing | stripe.com | "Issuing for agents" | No | No | dev infra | Needs Stripe business account |
| Highnote | highnote.com | virtual + physical | US financial accounts | No | dev infra | B2B embed |
| Extend | paywithextend.com | virtual credit cards + AI toolkit | No | No | dev infra | Anchored to corporate card |
| Slash | slash.com | Visa business charge cards via MCP | business deposits | No | B2B | Not retail |
| Column / Increase / Unit / Synctera | — | Yes (API) | Yes (chartered / partner banks) | No | dev infra | Raw BaaS, someone must build the product |
| Nekuda | nekuda.ai | injects your saved cards | No | No | B2B dev | Payment proxy / WebMCP, issues nothing |

## B. Crypto / protocol / agent-wallet players

| Name | URL | What | Custody | Retail? | Difference vs us |
|---|---|---|---|---|---|
| PayBox (MoonPay) | paybox.sh | wallet + cards + credential vault, pay via Claude/ChatGPT | Non-custodial | **Yes** | Closest retail analog. No IBAN, no bank account |
| Agentcard | agentcard.sh | card vault + prepaid Visa issuance widget for apps (YC) | Custodial | B2B2C | Cards only, no bank, no crypto |
| AgentWallet | agentwallet.ai | wallet + virtual card + MCP/AP2/x402/ACP, WhatsApp | Custodial | Dev-first | Dev/protocol-heavy, no IBAN |
| Skyfire | skyfire.xyz | agent identity + USDC credentials | Custodial | Dev | No cards/bank |
| Coinbase x402 / AgentKit / Bazaar | cdp.coinbase.com | protocol + SDK + marketplace | Custodial MPC | Dev | USDC only |
| Circle for Agents | circle.com | agent accounts, USDC | Custodial | Dev | USDC only |
| Privy | privy.io | embedded agentic wallets w/ policies | Non-custodial | Dev | Crypto only |
| Crossmint | crossmint.com | agent wallets, virtual cards, payouts | Custodial | Dev | B2B |
| Nevermined | nevermined.io | delegated spend, metering, x402/MCP/A2A | Custodial | Dev | Merchant monetization |
| PayAI | payai.network | x402 facilitator + policy (Solana) | Non-custodial | Dev | Narrow |
| BotWallet | botwallet.co | open-source agent wallet MCP, virtual cards | Non-custodial | Dev+user | Crypto only |
| MoltPe | moltpe.com | USDC wallet + x402 + MPP + MCP | Non-custodial | Dev | USDC only |
| Fewsats / Lightning Labs L402 | fewsats.com | Lightning pay-per-call | mixed | Dev | Bitcoin only |
| Stripe ACP / PayPal Agent Toolkit / Adyen Agentic | — | merchant-side agentic checkout | Custodial | Merchant | Acceptance, not a consumer wallet |
| Visa Intelligent Commerce / Mastercard Agent Pay | — | network tokenization for agent buys | Custodial | Enterprise | Infra sliver |
| Cloudflare x402 / Google AP2 | — | protocol/edge | n/a | Dev | Standards only |

## Our wedge

1. **Nobody offers real Visa card + real IBAN/ACH/SEPA account + non-custodial keys + retail onboarding in one place.** Every rival is either custodial B2B infra (Natural, Mercury, Lithic, Marqeta, Unit) or crypto/x402 rails (Coinbase, Circle, MoltPe, BotWallet).
2. **Retail without an app**: agent on demand in WhatsApp/Telegram/Signal. Only PayBox and AgentWallet are near this; neither has a bank account.
3. **Cross-border corridors on real rails** (EUR/USD + stablecoins, seconds): US-only ACH players can't follow.
4. **Power-user door**: one MCP prompt gives Hermes/OpenClaw/Claude the same card, account and wallet. Same product, two audiences.
5. **User holds keys, still gets fiat banking**: the combination competitors treat as mutually exclusive.

Sources: vendor sites/snippets Sep 2026; Catena domain and some retail claims rest on marketing copy, verify before quoting publicly.
