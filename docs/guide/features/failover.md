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

## Failover groups are not bond groups

They solve different problems and both exist.

| | Failover group | Bond group |
|---|---|---|
| Bearers used | one at a time | several at once |
| Chooses by | priority order | cost and capacity |
| Purpose | keep working when a bearer fails | push one message through several weak bearers |
| Configured at | `/api/failover-groups` | `/api/bond-groups` |

A bond group splits a message into coded symbols and spreads them across its members, so a payload
too large or a link too lossy for any single bearer still gets through. Members are sorted free
first by capacity, then paid by cost, so the cheap bearers carry as much as they can before an
Iridium frame is spent.

The per bearer maximum the allocator plans against:

| Bearer | MTU |
|---|---|
| mesh (Meshtastic) | 100 bytes, `MESHSAT_MESH_MTU` to override, 1 to 237 |
| iridium (SBD) | 340 bytes |
| iridium_imt | 100 KB |
| cellular, sms | 160 bytes |
| zigbee | 100 bytes |
| aprs | 256 bytes |
| tcp, mqtt, webhook | 65535 bytes |

The mesh default is conservative on purpose. Meshtastic nominally allows around 237 bytes of
payload on SF7 LongFast, but the radio firmware drops larger frames depending on preset, region and
antenna, and 100 bytes is what has actually been measured to work on the field kits. Raise it only
after testing your own radio configuration.

## Rehearsing a failure

`POST /api/hemb/fault-inject` marks a bearer as faulted so the allocator skips it, and
`DELETE /api/hemb/fault-inject/{id}` restores it. It is the honest way to answer "what happens when
the satellite modem dies" without unplugging anything in the field, and it is worth doing before
you need the answer.

## Related

- [Access rules](/guide/features/access-rules) for pointing `forward_to` at a group.
- [Dead letter queue](/architecture/dead-letter-queue) for what happens to held messages.
- [Interfaces API](/api/interfaces) for the interface lifecycle these groups read.
