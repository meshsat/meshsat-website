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

## Cloudloop's MQTT feed

Cloudloop can push your satellite messages over MQTT as well as by webhook. It is mutual TLS:
Cloudloop issues a client certificate for your account, and the Hub presents it. On the
Cloudloop account under Settings → Integrations, fill in the broker (`ssl://host:8883`), your
account id, and the three PEM blocks: the broker's CA, your client certificate and its key.
Paste each block whole, `-----BEGIN` to `-----END`; the Hub refuses a block that does not parse
or a certificate whose key is not its own, at save time, so a bad paste is an error on the page
and not a silent reconnect loop.

The Hub keeps one connection per account, subscribed to your account's `MO` topic. Messages it
receives are filed under your account only: a device you have not registered is yours to
register, a device another account owns is refused. Leave the broker empty and the webhook
alone carries your traffic.
