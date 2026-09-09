---
title: "Privacy Policy"
description: "What MeshSat collects, why, who else sees it, and how to get it back or delete it."
---

## Privacy Policy

**Last updated: September 2026**

Three products, three very different answers. The Bridge and the Android app run on your hardware and send us nothing. The Hub is a service we operate, so this policy is mostly about the Hub.

<!--more-->

### Who is responsible

The controller for personal data held in MeshSat Hub and on meshsat.net is Elli.Z.G., a sole proprietorship registered in Leiden, the Netherlands, Chamber of Commerce number 99812584, trading as MeshSat. Contact: [hello@meshsat.net](mailto:hello@meshsat.net).

### meshsat.net

We use [Umami](https://umami.is/) for analytics. It is self-hosted on our own infrastructure, sets no cookies, and does not build a profile of you. Nothing is shared with anyone.

### MeshSat Bridge and MeshSat Android

They run on your device, on your network. There is no telemetry and no phone home. Nothing reaches us unless you deliberately connect the Bridge to a Hub account, or configure a transport that relays through a carrier.

If you self-host your own Hub, everything below describes data that stays on your own infrastructure, and we are not involved in it at all.

### MeshSat Hub: what we hold

**Your account.** Email address, name, and what you told us when you asked for access: organisation, country, hardware, what you want to use it for, an optional callsign and Matrix ID. We also record the network address you signed up from and the moment you agreed to the terms. The address is kept as a record of where a request came from, which is how we tell fifty requests from one host apart from fifty people.

**Your fleet.** The devices and bridges you register, their identifiers, configuration and status.

**Your traffic.** Positions, telemetry, message content and message metadata, for as long as your retention setting keeps it. Message content is content: if you send coordinates, a name or a casualty report through the Hub, we hold it. Where you have configured end-to-end encryption, we hold ciphertext we cannot read.

**Evidence.** A tamper-evident audit log of security-relevant actions, kept for 90 days by default.

**Credentials you give us.** Provider API keys for your own Iridium, Twilio, Rock7 or Globalstar accounts, encrypted at rest, used only to send and receive on your behalf. They are deliberately excluded from your data export so they cannot leak through it.

We do not hold your payment card. Ko-fi does.

### Why we hold it

To run the service you asked us to run: relaying your messages, showing your fleet, enforcing your plan, and keeping the account secure. Legally, that is performance of our contract with you, and our legitimate interest in keeping the service secure and abuse free. Where you have given consent, for example to the terms at signup, we record that you gave it and when.

### Who else sees it

Only where the work requires it:

- **Ko-fi**, for subscription payments. They tell us that a payment happened, from which address, and any message attached to it.
- **Satellite and messaging carriers**, for traffic you route through them: Ground Control and Cloudloop for Iridium, Rock7 and RockBLOCK, Globalstar, Twilio for SMS. These are your accounts. What passes through them is subject to their terms as well as ours.
- **Nobody else.** We do not sell your data, we do not share it for advertising, and there is no third-party analytics or tracking in the Hub.

If we are legally compelled to hand something over, we will tell you unless we are prohibited from doing so.

### Where it lives

The Hub runs on our own hardware in Norway. Database backups are stored in the Netherlands. Traffic reaches the service through edge servers in Norway, Switzerland and the United States, so depending on where you connect from, your connection may transit the US even though your data is not stored there.

We do not use hyperscale cloud providers for the Hub.

### How long we keep it

| What | How long |
|---|---|
| Messages, positions, telemetry | your configured retention period |
| Audit log | 90 days by default |
| Account and fleet records | until you close the account |
| Closed accounts | 30 days, then destroyed |

Closing your account marks it for deletion and starts a 30-day window. That window exists so an accidental deletion is recoverable. After it, the data is purged and we cannot restore it.

### Your rights

Under the GDPR you can ask for a copy of your data, correct it, delete it, restrict or object to how we use it, and take it elsewhere.

Two of those you can exercise yourself, immediately, without asking us:

- **A copy of everything**, from Settings, as a single archive with one file per record type.
- **Deletion**, by closing the account.

For anything else, write to [hello@meshsat.net](mailto:hello@meshsat.net). If you think we have handled your data badly, you can complain to the Dutch data protection authority, the Autoriteit Persoonsgegevens.

### Security

Access is authenticated and role-based, and every tenant's data is separated at the query layer. Traffic is encrypted in transit. Provider credentials are encrypted at rest. The audit log is hash-chained so tampering is detectable. Backups are taken daily.

We will tell you without undue delay if a breach affects your data.

### Changes

If we change this policy in a way that matters, we will email the address on your account before it takes effect.

### Contact

[hello@meshsat.net](mailto:hello@meshsat.net)
