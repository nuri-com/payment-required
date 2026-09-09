# Wirex MCP: connect your agent

> Add a self-custodial wallet, card controls, bank accounts and payment tools to an MCP-capable agent. Tool discovery requires no integration API key. Account access and payments still require wallet authorization and, for financial products, identity verification.

**Endpoint:** `https://wirex.nuri.com/mcp`

**Transport:** HTTP MCP (POST JSON-RPC; `Accept: application/json, text/event-stream`)

**Observed:** 2026-09-09, server `wallet-connection` 0.62.0, protocol `2025-11-25`. The live sandbox uses Base Sepolia (84532). Refresh the live catalogue rather than pinning this snapshot as a permanent contract.

## Fastest setup

Paste this into Hermes, OpenClaw or another MCP-capable agent:

> Connect to https://wirex.nuri.com/mcp using your native HTTP MCP client. No API key is needed to initialize the server or list its tools. Read the initialization instructions and current schemas. Tell me the environment and what I can do. When I choose to start, call connect_wallet as documented, show its exact approval URL and keep session material private. Ask for missing details only. Preserve payment IDs and idempotency references across retries; report success only after the matching operation confirms it.

## Hermes CLI

```sh
hermes mcp add payments --url https://wirex.nuri.com/mcp
hermes mcp test payments
```

Use `/reload-mcp` in an existing Hermes conversation and follow its confirmation, or start a fresh conversation. MCP connection does not install a browser, merchant accounts, email delivery or travel APIs. Configure those separately in the host agent when required.

[Official Hermes MCP documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp).

## Other agents

Use the remote HTTP MCP entry in your agent's native setup. The URL is `https://wirex.nuri.com/mcp`; do not invent an API key, OAuth issuer or bearer token. Host applications may require an MCP-capable version/plan. An arbitrary chatbot without tool execution or browser access will not perform complex merchant checkouts.

## Raw API discovery

```sh
curl https://wirex.nuri.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"my-agent","version":"1.0"}}}'
```

Send `notifications/initialized` next (notification: omit `id`), then `tools/list` with the negotiated protocol header. A GET in a browser returns 405 because this is an RPC endpoint, not a webpage.

```sh
curl https://wirex.nuri.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H 'MCP-Protocol-Version: 2025-11-25' \
  --data '{"jsonrpc":"2.0","method":"notifications/initialized"}'

curl https://wirex.nuri.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H 'MCP-Protocol-Version: 2025-11-25' \
  --data '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
```

No prompts or resources were advertised in this snapshot. Their list methods returned `-32601`. Tool discovery is the source of truth, not this page's historical list.

## Available tool groups

| Tool | What it enables | Boundary |
| --- | --- | --- |
| `connect_wallet` | Wallet connection; returns secure approval link | New request is not authorization. Retain the returned request and private session. |
| `create_account` | Start account creation | Requires the user's real email and residence country. Verification is asynchronous. |
| `get_account_status` | Verification, card/IBAN readiness and capability/unlock guidance | May start missing-product provisioning. Do not treat its name as a guarantee of a read-only call. |
| `provision_virtual_card_and_bank_account` | Finish virtual card and EUR IBAN setup | Requires approved verification; reuse existing products. |
| `cards` | Card list/details, virtual issuance, limits, freeze/unfreeze, close, 3DS and transfers | Secrets and destructive actions need explicit care; closing is irreversible. |
| `bank` | Accounts, wallet balances, rates, statements, bank transfers, withdrawals, x402/MPP payments, activity | Indicative rates are not executable quotes. Keep wallet balance separate from provider activity. |
| `payouts` | Discover corridors, manage recipients, quote/send/confirm/status/resolve | 16 corridor identifiers are advertised; country/currency availability must come from a live eligible session. Tanzania mobile money is not established by this catalogue. |
| `agents` | Set up three payment agents, inspect/change limits, pay resources and revoke | Sandbox Base Sepolia, supported merchant/network/scheme and caps apply. |
| `sandbox` | Test deposits, card purchases and 3DS scenarios | Simulated provider events, never proof of a live merchant purchase. |

The advertised payout rails include SEPA, ACH, Faster Payments, PIX, SPEI, Fedwire, SWIFT, CIPS, CHATS, FPS HK, IMPS, InstaPay, BI-FAST, NIP, IPP and PSE. A rail name is not a claim of recipient availability, settlement time or price.

## x402 and MPP

`bank pay` and `agents pay` expose x402 and **Machine Payments Protocol (MPP)** workflows. Inspect the current schemas: root-wallet and agent paths have different signing, funding and amount requirements. Do not infer support for every mainnet resource from a sandbox tool's existence.

[Nuri's postcard service](https://nuri.com/api/x402) is a separate real provider using mainnet payment challenges. The sandbox payment agents cannot pay a mainnet postcard merely because both mention USDC. Network, asset, scheme, merchant support and spend authorization must all match.

## Authentication and retries

1. Discover public tools without an integration key.
2. When requested, call `connect_wallet` without a fabricated request ID; show the exact returned approval link in a top-level browser tab.
3. Retain the private session. Recheck the same request according to tool guidance. A browser tab closing is not successful authorization.
4. Collect email and residence only if account setup requires them; show the returned identity-verification link. Do not restart pending verification.
5. Quote before money movement. Preserve estimate IDs, payment IDs and idempotency keys. On transport ambiguity, query status or resolve rather than resubmitting with a new key.

Never paste seed phrases or wallet private keys into a chat. A self-custodial wallet does not remove the compliance and account restrictions of card issuers or banking partners.

## Retail checkout examples

Cinema tickets, shopping, flights, a postcard, sending money to family and making a personal avatar video are example goals. Native payment tools provide payment capabilities; they do not by themselves browse, sign into merchants, fulfill a trip, provide Tanzania mobile-money payouts, or clone media. Those tasks require an appropriate agent, verified providers and the user's consent/account access.

## Messaging availability

No public signup handle for Telegram, WhatsApp, iMessage, Signal or email has been verified for this V2. The web chat is available to try; the messaging buttons disclose this rather than sending visitors to unrelated contacts. Do not reuse the old `t.me/nuri` or `wa.me/message/nuri` placeholders.

[Read the sanitized capability snapshot](https://paymentrequired.com/v2/capabilities.json). [Return to the one-pager](https://paymentrequired.com/v2/).
