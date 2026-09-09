# Your agent wallet, card and bank account.

> A self-custodial wallet, Visa card and bank account for your agent. Explore everyday payments in chat, or connect your own agent with one MCP URL. No integration API key.

Pay people. Buy things. Get on with life. Crypto, stablecoins and everyday money. Just tell your agent what you need.

## Your money. Your say.

### Your own wallet

Keep crypto and stablecoins in a self-custodial wallet. Connect the account you control.

### A card for your agent

Issue a Visa card, see its activity, set spending limits and freeze it from a conversation.

### Bank accounts, too

EUR IBAN and SEPA, with USD ACH where available. Eligibility depends on residence and verification.

### Permission, not a blank cheque

Choose spending limits and permissions. Check the details before authorizing access or a payment.

### Money across borders

Check available payout routes, fees and what the recipient receives before you confirm.

### Pay for useful services

Pay per use for supported services, within the limits you set for your agent.

## What would you like done?

Start with a sentence, not another app. These are example tasks: your agent needs the right connected services, account access and your payment permission.

### Two tickets. Best seats.

Book two cinema tickets for Friday evening. Find seats together and ask me before paying.

### Send money home.

Help me send money to my wife in Tanzania. Check the payout options, fee and amount she receives before I approve.

### Find the flight. Book it.

Find flights for my next trip, compare the total price including baggage, and book my choice after I approve.

### The right little thing.

Find a screen protector for my iPhone SE. Ask which generation I have, check fit and delivery, and show me the total before buying.

### A real postcard for Mum.

Help me print and send a postcard to my mum. Ask for the photo, message and postal address, then show me the price.

### You, with a punchline.

Using my own face and voice, help me make a funny avatar video for Instagram telling a joke. Ask for my consent and source clips; let me review it before posting.

## Give your agent a bank.

One URL connects the payment tools. No integration API key, no new dashboard to learn.

Connect my agent to https://wirex.nuri.com/mcp using its native HTTP MCP client. No API key is needed to discover the tools. Initialize the server, read its instructions and list the current tools; don't assume a cached action list. Tell me the environment and what is available. When I choose to connect, call connect_wallet, open its exact secure approval link and keep the session private. Follow returned next steps, ask only for missing details and preserve payment references on retries. Do not claim a payment or checkout succeeded without a returned result. Help me get started in my language.

```sh
hermes mcp add payments --url https://wirex.nuri.com/mcp
hermes mcp test payments
```

## Good to know.

### Do I need to understand crypto?

No. Ask in everyday language. Your agent should explain the amount, fees and approval before you act. Wallet setup and identity verification may still be required.

### Is everything self-custodial?

The wallet is self-custodial. Cards, fiat balances and bank transfers are provided through financial service partners and have their own eligibility, compliance and service terms. Self-custody does not mean bank or card balances cannot be restricted.

### Can I start in Telegram or WhatsApp?

That's the intended experience, alongside iMessage, Signal and email. This V2 preview does not yet have verified public signup links for those channels. You can try the web chat or connect your own agent now.

### Can it already do every example above?

Not from the payment MCP alone. Shopping and bookings also need a browser-capable agent, access to your merchant accounts and supported checkout services. Tanzania payouts and avatar creation need a verified provider. The examples are task ideas, not purchase confirmations.

### What is live in this preview?

The web chat discovers the live Wirex MCP and uses its current payment tools. The connected environment is a sandbox; an available tool is not proof of a real card purchase, payout or completed KYC. Your agent must check current availability before acting.

## Links

- [MCP integration](https://paymentrequired.com/v2/integration.md)
- [Capabilities](https://paymentrequired.com/v2/capabilities.json)
- [Live MCP](https://wirex.nuri.com/mcp)
- [Web page](https://paymentrequired.com/v2/)
