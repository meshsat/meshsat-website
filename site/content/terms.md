---
title: "Terms of Service"
description: "Terms for MeshSat Bridge and the hosted MeshSat Hub."
---

## Terms of Service

**Last updated: September 2026**

These terms cover two different things: software you run yourself, and a service we run for you.

<!--more-->

### Who you are contracting with

MeshSat is a trading name of Elli.Z.G., a sole proprietorship (eenmanszaak) under Dutch law, registered in Leiden, the Netherlands, Chamber of Commerce number 99812584, VAT identification number NL005411721B30. Write to [hello@meshsat.net](mailto:hello@meshsat.net); a postal address for service of legal documents is available on request.

### MeshSat Bridge

MeshSat Bridge is open-source software under the GNU General Public License v3.0. It is provided as is, without warranty of any kind. You run it on your own hardware, on your own network. Nothing in this section is a service, and we owe you nothing in respect of it beyond the licence.

You are responsible for using it lawfully, including radio licensing for whatever transports you configure. A licence to use the software is not a licence to transmit.

### MeshSat Hub: what the service is

MeshSat Hub is a hosted service. You create an account, connect bridges and devices to it, and it stores and relays their messages.

**It is not an emergency service.** This is the most important sentence in this document. MeshSat Hub is not a substitute for calling the emergency number in your country, for a registered distress beacon, or for any monitored alerting service. Do not build a plan that depends on it where a life is at stake without an independent fallback that does not involve us.

Message delivery is best effort. Mesh radio, satellite and cellular links fail for reasons nobody controls: weather, terrain, orbital geometry, carrier outages, spectrum interference and jamming. We do not promise that a message will arrive, or arrive within any period. We do not monitor your traffic, and nobody is watching your account for an alert on your behalf.

We give no warranty that the service will be available, uninterrupted or error free. It runs from a single site. We do not offer a service level agreement, and we do not offer one at any price.

### Accounts

Access is by approval. Requesting an account does not entitle you to one, and we may decline without giving a reason.

Keep your credentials secure. You are responsible for what happens under your account. Tell us promptly at [hello@meshsat.net](mailto:hello@meshsat.net) if you believe it has been compromised.

You may not use the service unlawfully, interfere with it or with other users, attempt to reach data that is not yours, or resell it without our written agreement. We may suspend an account that does, and we will tell you why.

### Plans and payment

Subscriptions are taken through [Stripe](https://stripe.com), which handles the payment. We do not see or store your card details.

| Plan | Devices and bridges | Price |
|---|---|---|
| Free | 4 | none |
| Crew | 24 | EUR 9 per month |
| Fleet | 100 | EUR 29 per month |
| Custom | agreed with us | on request |

Those are the final amounts you pay. Any VAT is included in them, so nothing is added at checkout.

The number is a combined ceiling on registered devices and bridges. It limits how many you may add. It does not limit messages, and it does not throttle anything you have already registered.

A subscription renews every month until you cancel it. Each payment covers the month ahead, and we add three days to the date it is paid to, so a slow notification never drops you. If a payment fails, Stripe retries it over the following days; your plan is not cancelled while that is happening.

### When a plan ends

Cancel whenever you like, from **Manage billing** in your account settings. Your plan then runs to the end of the period you have already paid for and ends there. You do not have to tell us separately: we are notified when you cancel, and again when the period runs out.

When it ends, the account moves to the free plan. **Nothing is deleted.** Every device and bridge you registered keeps working and keeps reporting. What changes is that you cannot add another until you are back under the free ceiling or you subscribe again.

**An SOS is never affected by billing.** Not by a lapsed plan, not by being over your device limit, not by a failed payment. The device ceiling is applied when something is registered and nowhere else. This is enforced in the code and covered by tests we do not weaken.

### Refunds and the right to withdraw

If you are a consumer in the EU you have 14 days from the start of a subscription to withdraw from it and get your money back. Ask at [hello@meshsat.net](mailto:hello@meshsat.net). If you have used the service during those 14 days we may keep a proportionate amount for what you used.

Outside that, payments are for the period they buy and are not refundable, because the period is already provided. If we get something badly wrong, ask anyway and we will deal with it fairly.

When we refund you, we email you a credit note for it. It reverses the original invoice and the VAT included in the price, so the two documents together are the complete record for your own books. If the refund covers a whole payment, the time that payment bought comes off your plan; everything you have registered keeps working either way.

### Your data

You own your data. You can export all of it at any time, from Settings, as a single archive. Provider credentials and other secrets are deliberately left out of that archive.

You can close your account whenever you want. Closing marks it for deletion, and the data stays recoverable for 30 days in case you did it by accident or change your mind. After 30 days it is destroyed and we cannot get it back.

If we close your account for a breach of these terms, the same 30 days applies.

What we collect and why is in the [Privacy Policy](/privacy/).

### Costs that are not ours

Satellite and cellular messages cost money, and that money is owed to the carrier, not to us. You bring your own Iridium, Twilio, Rock7 or Globalstar account, and that carrier bills you directly for what your devices send.

We provide rate limits, access rules and per-device ceilings so you can control that spend. Configuring them is your job. A chatty sensor and a wildcard routing rule will produce a bill, and it will be your bill.

### Changes

We may change these terms. If a change matters to you, meaning it affects price, your rights, or what we do with your data, we will email the address on your account before it takes effect. Continuing to use the service afterwards means you accept the change. If you would rather not, close the account and we will refund the unused part of a paid period.

### Liability

Nothing here limits liability for death or personal injury caused by our negligence, for fraud, or anything else that cannot lawfully be limited. Consumer rights that apply to you regardless of contract are unaffected.

Subject to that, our total liability to you for anything connected with the service is limited to the fees you actually paid us in the 12 months before the claim arose. If you are on the free plan, that is zero, and you should read that as the plain statement of risk it is.

We are not liable for indirect or consequential loss, for lost profit or data, or for a message that did not arrive, arrived late, or arrived at the wrong recipient.

### Law

Dutch law applies. Disputes go to the courts of the Netherlands. If you are a consumer, this does not deprive you of the protection of the law of the country you live in, and you may also bring a claim there.

### Contact

[hello@meshsat.net](mailto:hello@meshsat.net)
