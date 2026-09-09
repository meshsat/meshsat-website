# Provider accounts

The Hub does not resell satellite time or SMS. You bring your own accounts, your provider bills
you directly, and the Hub uses your credentials to send on your behalf. That is why plans are
priced by fleet size rather than per message.

## Adding them

Open **Settings** and find Provider accounts. You can add:

| Provider | Used for |
|---|---|
| Cloudloop | Iridium SBD and IMT, sending and receiving |
| Rock7 | RockBLOCK devices |
| Twilio | SMS, in both directions |
| Globalstar | Globalstar devices |

Credentials are encrypted per account. Another account on the Hub cannot read yours, and the
export in [Your data](/hub/your-data) deliberately withholds them rather than handing back
recoverable secrets.

## Webhook URLs

Each provider account gets its own webhook URL, with a secret in the path. Paste that whole URL
into the provider's console. The secret is what tells the Hub whose message has arrived, so a
message can never land in the wrong account.

Treat the URL as a credential. It travels through consoles, logs and support tickets, so the
providers that can sign their requests are still required to sign them.

## One thing you cannot bring yet

Cloudloop's MQTT feed uses mutual TLS with certificate files and is configured at the platform
level, so it is shared rather than per account. Everything else on this page is yours.
