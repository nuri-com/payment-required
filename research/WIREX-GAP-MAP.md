# Wirex BaaS vs our MCP (Sep 8 2026, from docs.wirexapp.com + repo grep)

## Called today (src/wirex-baas.mjs, src/wirex-api.mjs)
token, user authorize/create(v2)/verification-link/verification-token (Sumsub SDD), user/wallet(s), config/tokens, rates, cards list/get/virtual/block/unblock/close/activate/limit/pin/3ds, bank/accounts (Sepa only), bank/transfer estimate(v2)+transfer, cards/transfer estimate+transfer, recipients read-only, activity statement/feed/single, withdrawal/requests, confirmation/signature/verify, physical card reads + plastic (legacy REST only). Via wirex.nuri.com /v1/debug: onboarding, push-to-card (recipient-from-card, mint, run), cards/details.

## Wirex catalogue (public docs)
Cards: Visa only. Virtual / plastic / metal, activate, block/unblock/close/rename, limits, PAN/CVV/PIN, 3DS, push-to-card (OCT), card top-up (AFT pull, PCI + 3DS). Apple/Google Pay: not documented.
Bank: SEPA EUR IBAN + ACH USD (both need activation, init/complete). No GBP account (Faster Payments outbound only).
Corridors v3 (estimate|initiate|confirm): sepa, ach, faster-payments, pix, spei, fedwire, swift, cips, chats, fps_hk, imps, instapay, bi-fast, nip, ipp, pse. No M-Pesa/GCash.
FX swaps USDC<->EURC (Circle-settled). WUSD/WEUR unified tokens on Base, Earn/yield on spendable balance. Global deposits USDC/USDT/EURC on Arbitrum, Base, BSC, Ethereum, Kaia, Polygon, Optimism, Solana, Tron. KYC hosted / Sumsub / API (SDD). KYB corporate only. Recipient CRUD (15 ops), XRPL, SMS confirm, v2 webhooks.

## Gap table
| Capability | Wirex | MCP | Value | Effort | Tool |
|---|---|---|---|---|---|
| Recipient CRUD | yes | read-only | 5 | M | bank recipients_manage |
| FX estimate->fund->execute | yes | no | 5 | M | bank fx_quote / fx_execute |
| Corridors (ACH, FPS first; then PIX/SPEI/SWIFT/...) | yes 16 | SEPA only | 5 | M | bank corridor_quote/transfer/confirm |
| Global deposit address + credit proof | yes | no | 5 | M | bank deposit_address |
| Card top-up from external card | yes | no | 4 | L | cards topup_quote/execute |
| Earn read/claim | yes | no | 4 | M | bank earn_status/claim |
| Physical card order e2e | yes | legacy reads | 4 | M | cards physical_order |
| Card rename, full PIN | yes | no/partial | 3 | S | cards rename, cards pin |
| Account activation incl. ACH | yes | Sepa POST only | 4 | S | bank activate_account |
| Bulk, KYB, XRPL, webhooks-in | yes | no | 2 | L | out of retail scope |

## Country coverage (Wirex docs)
CARD: yes for all 73 requested countries.
SEPA IBAN yes: AT BE BG CY CZ DK EE FI FR DE GR HU IS IE IT LV LT LU MT NL NO PL PT RO SK SI ES SE GB. No: AD HR GI MC ME CH + all non-Europe.
ACH/USD yes: AD AR AU AT BE BR BG CL CO CY CZ DK EE FI FR DE GI GR HK HU IS ID IE IT LV LT LU MY MT MX MC ME NL NO PE PL PT RO SK ES SE CH TW TH GB US VN (+SG). No: HR EC PH AZ BH SV GE GH GG IM IL JP JE KZ KE MO MD NG OM PA SA ZA KR TR UG UA AE UZ.

## Next 8 MCP tools
1 bank recipients_manage, 2 bank deposit_address, 3 bank corridor (ACH + FPS first), 4 bank fx, 5 bank activate_account, 6 cards topup, 7 bank earn, 8 cards physical_order + rename + pin.
