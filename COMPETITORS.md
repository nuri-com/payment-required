# Competitive landscape — agent payments (Sep 2026)

| Name | URL | Category | Custody | Focus | Key difference vs paymentrequired.com |
|---|---|---|---|---|---|
| Natural | natural.com | Agent banking; FDIC-insured agent wallets, $30M Series A Jul 2026 | Custodial | Dev/B2B | Custodial fiat rails; no non-custodial crypto+IBAN+cards in one MCP |
| Payman AI | paymanai.com | AI→human orchestration on existing rails (Visa/Coinbase backed) | Custodial | Dev | Orchestration layer, not user-owned wallets |
| Skyfire | skyfire.xyz | Agent identity + USDC payment credentials ("Visa for the AI economy") | Custodial | Dev | Identity-led crypto; no cards/IBAN/remittance |
| Coinbase x402/AgentKit/Bazaar | cdp.coinbase.com | Protocol + SDK + 112-service marketplace | Custodial (MPC) | Dev | On-chain USDC only; dev-native, not retail |
| Stripe ACP | docs.stripe.com/agentic-commerce/acp | Agentic Commerce Protocol (w/ OpenAI+Meta) | Custodial | Merchant | Merchant checkout; fiat only |
| PayPal Agent Toolkit | docs.paypal.ai | SDK/MCP wrapping PayPal APIs | Custodial | Dev | Fiat rails only |
| Visa Intelligent Commerce | visa.com | Credentials/controls for AI-initiated buys | Custodial | Enterprise | Card-network sliver, not full-stack wallet |
| Mastercard Agent Pay | mastercard.com | Agentic Tokens, Verifiable Intent | Custodial | Enterprise | Tokenization standard; no user-owned keys |
| Nekuda | nekuda.ai | Agent card storage/issuance (Madrona-backed) | Custodial | Dev | Card-centric; no crypto/remittance |
| Crossmint | crossmint.com | Agent wallets, virtual cards, payouts via API | Custodial | Dev | Embedded custodial B2B wallets |
| PayBox (MoonPay) | paybox.sh | Retail vault: wallet/cards/credentials, pay via Claude/ChatGPT | Non-custodial | **Retail** | Closest analog — but vault only; no IBAN, x402, MPP |
| Catena Labs | (verify domain) | AI-native bank for agents (Circle cofounder, $30M A) | Custodial | Dev | Custodial bank; no self-custody |
| Circle | circle.com | Circle for Agents, agent accounts, USDC settlement | Custodial | Dev | USDC/wallets only |
| Privy | privy.io | Embedded agentic wallets w/ policy rules | Non-custodial | Dev | Crypto wallets only; no banking/cards |
| Fewsats / L402 | fewsats.com | Budget-gated L402 Lightning payments | Custodial (LN) | Dev | Bitcoin-only |
| Cloudflare x402 | developers.cloudflare.com/agents | x402 in Agents SDK; x402 Foundation co-founder | Protocol | Dev | Infra, not a wallet product |
| Google AP2 | — | Agent Payments Protocol on A2A | Protocol | Dev | Standards layer only |
| Nevermined | nevermined.io | Delegated spending, metering, x402/MCP/A2A | Custodial | Dev | Merchant/API monetization, not retail wallet |
| PayAI | payai.network | x402 facilitator + budget policy (Solana-first) | Non-custodial | Dev | Narrow facilitator; no full stack |
| BotWallet | botwallet.co | Open-source agent wallet MCP, virtual cards (OpenClaw-focused) | Non-custodial | Dev+user | Same lane but crypto-only; no IBAN/remittance |
| MoltPe | moltpe.com | Non-custodial USDC wallet + x402 + MPP + MCP | Non-custodial | Dev | Very close stack, USDC-only, dev-skewed |
| Adyen Agentic | adyen.com | Agentic Feed/Cart/Payments, Meta AI-checkout | Custodial | Merchant | Merchant-side acceptance |
| Lightning Labs L402 | lightning.engineering | L402 standard + agent tools | Non-custodial | Dev | Bitcoin-only standard |

## Our wedge

1. **Only 100% retail + non-custodial player.** Nearly all rivals are custodial and dev/B2B. PayBox is retail non-custodial but vault-only.
2. **Full stack in one MCP:** crypto/stablecoin wallet + cards + IBAN + remittance corridors + x402 + MPP. Every rival owns one slice.
3. **Two-sided distribution:** agent-on-demand in WhatsApp/Telegram/Signal (no app) AND bolt-on MCP for existing agents (Hermes, OpenClaw, Claude).
4. **MPP in a retail product** — essentially unshipped anywhere else.
5. **Real banking rails (IBAN/SEPA/corridors) via Wirex BaaS** — crypto-only rivals can't follow.

Watchlist (facilitator ecosystem): x402dir, Primer, thirdweb.
Note: Catena Labs domain unverified — confirm before citing publicly.
