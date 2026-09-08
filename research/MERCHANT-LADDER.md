# Merchant ladder for the money agent (verified Sep 8 2026, read-only)

Demo ladder: Mullvad (signup, no email) -> Bitrefill API (no-browser buy) -> Bitrefill guest card -> Gumroad $1 (Stripe Elements). eBay Buy sandbox as CI regression path.

| # | Service | Signup | Email verify | Card vendor | 3DS | Cheapest | Wall | Why |
|---|---|---|---|---|---|---|---|---|
| 1 | Mullvad mullvad.net/en/account/create | none, generated number | no | Stripe (key in source) | high (EU SCA) | EUR 5 | hCaptcha | zero signup fields |
| 2 | Bitrefill | none guest, email for receipt | no | Stripe | med | ~$5 | Cloudflare (curl only) | guest checkout + official purchase API |
| 3 | Coinsbee | email guest | receipt | Stripe-class | med | EUR 1-5 | captcha strings | guest + cheap + business API |
| 4 | Gumroad ($1 product) | email at pay | no | Stripe (9 refs) | low-med | $1 | low | instant digital, no account |
| 5 | Ko-fi ($1) | email/name | claim link | Stripe/PayPal | low-med | $1-3 | CF managed challenge | one-shot payment |
| 6 | Buy Me a Coffee | email/name | link | Stripe | low-med | $1-5 | low-med | reliable Stripe form |
| 7 | Porkbun | email+password | link | Stripe | med | $2-4 TLD | Cloudflare | email-only + API |
| 8 | Eneba | email+password | link | Braintree/Adyen | med | EUR 1 keys | fraud screening | sub-EUR2 instant keys |
| 9 | Eventbrite | email | link | Braintree/Adyen-class | low-med | free / EUR 1-5 | med | free tickets = $0 signup drill |
| 10 | FlixBus | email guest | no | Adyen | med | EUR 3-5 | low-med | true guest checkout |
| 11 | Patreon | email+password | link | Stripe/PayPal | low-med | $1-3/mo | med | cancel-anytime micro sub |
| 12 | esim.sm | email | code/link | Stripe-class | low-med | $1-3 | low | instant QR |
| 13 | Dundle | email | verify | card | med | EUR 5-10 | med, phone strings | backup gift-card rail |
| 14 | Proton | username+password | code | Stripe-class | med | free / EUR 4-5 | med | free tier drill |
| 15 | Namecheap | email+password+address | link + risk review | card | med | $1-6 | HIGH (403 curl) | cheapest invoice, worst wall |

Also: nadanada.me (no account, no wall, VPN $0.50 / eSIM $0.99, card + crypto) = best first target (from round 1).
Excluded: Amazon (SMS + captcha), Uber/Bolt/Wolt/Lieferando (phone mandatory), Ryanair, Hetzner (KYC), Twilio (phone), G2A (403), Discord Nitro (phone).

## Buy without a browser
Bitrefill API, Coinsbee Business API, eBay Buy APIs (sandbox), Shopify Storefront/Checkout API, Stripe Payment Links, Shop Pay agentic checkout, ChatGPT Instant Checkout / ACP merchants, Perplexity agentic commerce (PayPal), Circle services (CryptoRefills, Purch for Amazon).
