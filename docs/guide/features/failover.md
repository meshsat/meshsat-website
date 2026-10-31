---
description: "Configure ordered groups of transport interfaces so Bridge can retry deliveries over another available link."
---

# Failover

A failover group is an ordered list of interfaces that behaves like a single destination. Point a
rule at the group and the bridge sends over the best member that is actually working, without you
rewriting the rule when a bearer goes down.

```
GET    /api/failover-groups
POST   /api/failover-groups
PUT    /api/failover-groups/{id}
DELETE /api/failover-groups/{id}
```

A group has an `id`, a `label`, and members carrying an `interface_id` and a `priority`. **Lower
priority wins**, so `0` is your first choice.

## How a member is chosen

Members are walked in priority order and the first usable one is taken. Usable means:

- the interface manager reports it online (bound to a device and connected), **or** a gateway is
  connected for it, **and**
- its receiver is not known to be deaf.

That second condition exists because an interface can transmit perfectly while hearing nothing. A
booth relay configured as "APRS first, SMS when APRS is down" kept choosing APRS while its receiver
was deaf, and every relayed message vanished into a link that looked healthy. A deaf member is now
skipped as if it were offline.

The gateway clause matters for the same family of interfaces: APRS and the other gateway backed
channels never bind to a device, so they read as unbound for their whole life. Without the extra
check, a group of `[aprs_0, cellular_0]` resolved to SMS while APRS was fine.

## When nothing is online

The group falls back to its first **enabled** member and the message is queued there rather than
thrown away. It sits in the [dead letter queue](/architecture/dead-letter-queue) until that bearer
comes back or the message expires. A failover group never silently drops traffic because every
member is down.

## Health scores tell you what failover will do

`GET /api/interfaces/health` scores every interface from 0 to 100:

| Component | Weight | Source |
|---|---|---|
| signal | 30% | latest signal reading, normalised from bars |
| success rate | 30% | deliveries sent versus failed, last 24 hours |
| latency | 20% | average queue-to-sent time, last 24 hours |
| cost | 20% | free bearers score 100, paid bearers less |

Two conditions short circuit the whole score to zero: an interface the spectrum monitor reports as
jammed, and one the receive watchdog reports as deaf. Both are cases where the arithmetic would say
"fine" and the link would still swallow everything.

A disabled interface also scores zero. The score is diagnostic rather than an input to selection:
failover picks by priority, not by score. Use the score to work out what your priorities should be.

## Related

- [Access rules](/guide/features/access-rules) for pointing `forward_to` at a group.
- [Dead letter queue](/architecture/dead-letter-queue) for what happens to held messages.
- [Interfaces API](/api/interfaces) for the interface lifecycle these groups read.
