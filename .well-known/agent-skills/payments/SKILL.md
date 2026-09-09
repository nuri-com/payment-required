---
name: paymentrequired-payments
description: Connect a user's agent to the live Wirex payment MCP.
---

# PaymentRequired payment setup

Use the native HTTP MCP client for `https://wirex.nuri.com/mcp`. No integration API key is required for initialize or tools/list. Read the live initialization instructions and tool schemas before acting; the backend changes regularly.

## Workflow

1. Initialize MCP, send notifications/initialized, and list current tools. Report the actual environment before money-related tests.
2. If the user wants to connect, call connect_wallet with the documented first-call shape. Do not invent request IDs. Show the exact returned approval link, keep session data private, then check the same request according to its retry guidance.
3. Ask only for missing email and actual residence if account creation requires them. Show a returned verification link. Pending verification must not be restarted.
4. Quote payment terms first. Approval to connect a wallet is not blanket approval to spend. Observe the user's scope, caps and per-action confirmation requirements.
5. Preserve estimate IDs, payment IDs and idempotency references; read status after ambiguous failures. Report success only from a corresponding confirmation.

A payment MCP is not a merchant browser or a media generator. Shopping, flights, cinema and personal avatars need additional tools, user accounts and consent. Tanzania mobile-money payouts are not established by the public catalogue. Do not claim the messenger onboarding channels are live before their public signup URLs have been configured.

Do not alter the user's agent configuration, grant extra permissions, or start a payment unless the user has requested that step.

[Integration guide](https://paymentrequired.com/v2/integration.md) · [Capability snapshot](https://paymentrequired.com/v2/capabilities.json) · [Backend docs](https://wirex.nuri.com/mcp/docs)
