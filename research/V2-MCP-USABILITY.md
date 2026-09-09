# V2 MCP usability review

Checked independently against `https://wirex.nuri.com/mcp` on 2026-09-09. Observed `wallet-connection` 0.62.0, protocol 2025-11-25, nine tools. Fresh initialize and tools/list succeeded without an API key. No paid operation, account provisioning or KYC completion was tested.

## What's already clear

- No integration API key for discovery. `connect_wallet` is the actual start, not a developer signup.
- `create_account` explicitly requires email and residence country; wallet authorization is not account verification.
- `get_account_status` explains feature availability and unlock steps.
- Current grouped tools cover cards, banking, 16 payout corridor identifiers, agents and x402/MPP. Old seven-tool and 'no corridors' claims are stale.
- Requests and payment IDs are intended to survive retries. That is important for avoiding duplicate transfers.

## Five changes with the highest usability impact

1. **Make the unauthenticated product state discoverable.** Include environment, chain, supported payment schemes, per-country eligibility source, verified messaging signup URLs, and which features need wallet-only versus verified-account access in initialize metadata or a public capability resource. Return a stable machine-readable version/timestamp. An agent should not infer production readiness from a tool name.

2. **Give grouped actions discriminated schemas.** `cards`, `bank`, `payouts` and `agents` have large parameter unions. Per-action required fields, `oneOf`/discriminators or documented structured action help would reduce hallucinated fields and repeated validation errors. Make amount units explicit per field; decimal money and integer USDC units currently need different handling.

3. **Standardize pending/next-step results.** Return a typed shape such as status, operation_id, user_action_required, retry_after_seconds, poll_tool and poll_arguments. An MCP host could wait directly instead of sending a new LLM request every few seconds. Include the operation blocking a second payment and an explicit recover/resolve step. Do not change an idempotency key after transport failure.

4. **Separate bridge readiness from successful approval.** Page-loaded/Connecting is not an auth success. A top-level approval tab should report ready/error/confirmed for the exact request, with an origin-bound correlation value. The host must verify the returned status before resuming. Avoid saying 'Face ID' when the selected signer actually starts with email/OAuth login. Current V2 uses a normal tab, not the unreliable embedded Privy iframe.

5. **Document the complete no-key setup in one place.** Add tested copy-paste entries for Hermes/OpenClaw and a raw initialize → notifications/initialized → tools/list example, plus unambiguous approval, KYC, limits, failures and resume examples. Correct MPP to Machine Payments Protocol. Make wallet self-custody distinct from issuer-controlled card/fiat services. The V2 includes a bounded setup prompt and docs, not invented key provisioning.

## Missing product inputs

- Verified public enrollment targets for Telegram, WhatsApp, iMessage, Signal and email. Existing `wa.me/message/nuri` returns 400; a generic `t.me/nuri` contact does not prove an operated bot.
- Verified browser/merchant providers for the six consumer examples. The payment MCP alone does not buy cinema tickets, book flights, make avatar videos, or prove Tanzania mobile-money coverage.
- Live financial availability and fulfillment proof separate from the sandbox. x402/MPP support does not make a Base Sepolia account able to pay mainnet Nuri postcards.

## What V2 does now

- Keyless MCP connection guidance plus a real web chat using the existing server-side model proxy.
- Accurate first-use controls and no made-up payment confirmations or merchant 'trained' badges.
- Five static HTML/Markdown language variants, semantic controls, at least 17px text, localized example prompts and explicit channel-availability dialogs.
- Existing homepage and financial backend unchanged by this redesign.

The original homepage still contains historical marketing copy. This review and the new V2 do not retroactively verify those old claims.
