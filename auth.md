# Auth.md: PaymentRequired / Wirex MCP

## Public discovery: no integration API key

`https://wirex.nuri.com/mcp` accepts keyless HTTP MCP initialize and tools/list requests. Use POST, Content-Type application/json and Accept application/json, text/event-stream. GET returns 405 because the URL is an RPC endpoint, not an HTML page.

No PaymentRequired OAuth issuer is advertised. Do not make up OAuth endpoints, API keys, or Authorization headers.

## Protected account access

Wallet authorization is separate from discovery. On the user's request, call connect_wallet according to its current schema, display the returned secure approval URL, and preserve the returned request ID and private session. Never generate request IDs on behalf of this flow, never display the private session, and never ask for wallet recovery phrases or private keys.

Open approvals in a top-level browser tab. Returning to chat or closing a tab does not prove approval; check the matching request status through the MCP.

A verified financial account additionally needs the user's email, actual residence country and identity verification. Initial wallet connection is not blanket payment consent. Quotes, confirmations, spending caps and per-action approval rules still apply.

## Retry and privacy rules

Read the MCP initialization instructions and current tool descriptions. Respect retry_after_seconds and next_action. Preserve the original payment ID, estimate ID and idempotency key on retries. If a payment may already have executed, read status or resolve the uncertain outcome rather than issuing a second payment.

The V2 web chat uses a server-side LLM proxy. No provider key is embedded in the website. Messages and tool context are processed by that proxy/model route; use secure approval pages for credentials. The session is kept in the current page's memory, not added to public metadata or analytics.

## Environment

Observed on 2026-09-09: Wirex MCP 0.62.0, sandbox, Base Sepolia 84532. A tool appearing in a catalogue is not proof of real bank availability, country eligibility, settled payment or merchant fulfillment.

[Full setup guide](https://paymentrequired.com/v2/integration.md) · [Current backend docs](https://wirex.nuri.com/mcp/docs)
