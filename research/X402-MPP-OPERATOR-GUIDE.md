# x402 + MPP operator guide (nuri-wirex-mcp sandbox/takeover-20260906, Sep 8 2026)

## agents tool (src/mcp-payment-agents.mjs, src/agent-resource-payment.mjs)
- Chain hardcoded Base Sepolia 84532 (`mcp-payment-agents.mjs:80` -> `payment_agents_base_sepolia_only`). Asset USDC 0x036CbD53842c5426634e7929541eC2318f3dCF7e, 6 decimals. Amounts are integer strings in base units (1000 = 0.001 USDC).
- `setup {session, daily_cap_units, per_tx_max_units}`: installs exactly 3 agents, terms immutable (repeat with changed terms -> `payment_agents_setup_terms_changed`). First call may return approval_url + pending; repeat identical until ready.
- `status {session, payment_id?}`: read-only. Does NOT show remaining daily allowance (gap).
- `pay {session, agent_id agent-1..3, protocol x402|mpp, url, max_amount_units, recipient, idempotency_key}`: allowlist byte-exact URL + recipient + ceiling from env `NURI_AGENT_RESOURCE_MERCHANTS` (`:317-326`), per-tx cap from contract readback, daily cap over trailing 24h, one in-flight payment per owner. First call returns `funding`; repeat identical + same key to continue.
- `set_limits`, `revoke` exist in 0.54.0 (docs/API.md:94-95), one revocation per setup. CAPABILITIES.md:53 still says missing (doc drift).
- Errors: payment_agents_setup_required|_incomplete|_terms_changed|_limits_invalid, payment_agent_revoked, payment_agent_id_invalid, payment_per_tx_limit_exceeded, payment_daily_limit_exceeded, payment_merchant_not_allowed, payment_merchant_ceiling_exceeded, payment_settlement_pending, payment_idempotency_terms_changed, payment_not_found, payment_agents_base_sepolia_only. Challenge: chain_or_asset_mismatch, recipient_mismatch, challenge_amount_exceeds_ceiling, unsupported_authorization_domain, extensions_not_supported, invalid_expiry, missing_settlement_receipt.

## Live public x402 (probed Sep 8, no purchases)
- nuri.com: `GET /api/x402` = discovery (200). `POST /api/x402/postcards` = real 402, x402 v2, scheme `upto`, eip155:8453, amount 3500000, asset 0x833589fC (native Base USDC), payTo 0xd3536635..., facilitator 0x402Feee.... `POST /api/mpp/postcards` = real MPP 402 (`WWW-Authenticate: Payment ... method=evm intent=charge realm=nuri.com`, fixed 3500000). MAINNET ONLY: sandbox agent (84532, `exact` + eip3009) cannot pay it today.
- x402scan.com directory (30M txns): twit.sh (X data, $0.0025-0.01, verified 402), Otto AI x402.ottoai.services (91 endpoints from $0.001), OneSource api.onesource.io (chain RPC + market data, x402 + Tempo MPP), StableEnrich, glim.sh, agentutility, BlockRun, dTelecom. All Base mainnet, none Sepolia.
- Cloudflare x402 demos: bot-wall/DNS fail, unverified.

## MPP in this codebase
mppx@0.8.19 charge flow. Same EIP-3009 USDC mechanics as x402, different wire format: challenge in `WWW-Authenticate: Payment`, credential in `Authorization`, receipt via `Receipt.fromResponse` status=success + 32-byte reference. Proven only against the server-local demo merchant https://localhost:18906/paid (loopback on the MCP box). Only public MPP resource: nuri.com/api/mpp/postcards.

## Prompt -> tools
1. "Set up my agents: 0.0015 USDC/day, 0.001 per payment" -> agents setup {1500, 1000} -> approval_url -> repeat until ready.
2. "Show my agents and limits" -> agents status {}.
3. "Pay this API 0.0005 USDC" -> agents pay {x402, url, 500, recipient, key} -> on funding repeat identical until settled.
4. "How much can agent-1 still spend today?" -> not available (gap).
5. "Change agent-2 to 0.002/day" -> agents set_limits + approval.
6. "Pay the postcard with MPP" -> fails today (allowlist + mainnet). Say so, do not retry with a new key.

## Top 5 gaps
1. Sandbox pays only the localhost demo merchant. Fix: Sepolia `exact`/eip3009 postcard route on nuri.com + add to NURI_AGENT_RESOURCE_MERCHANTS.
2. status hides remaining allowance. Fix: return spent_today_units / remaining_today_units.
3. CAPABILITIES.md vs API.md drift on set_limits/revoke. Fix docs.
4. Receipt merchant-reported, not chain-verified (`:402`). Fix: append blockscout tx link + nonce check.
5. One in-flight payment per owner + key discipline. Fix: surface payment_settlement_pending with blocking payment_id and "resume, don't retry".
