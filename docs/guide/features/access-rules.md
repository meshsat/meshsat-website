# Access rules

Access rules decide what the bridge does with every message that arrives on an interface, and
what it is allowed to send back out. They are the reason a mesh message reaches a satellite, and
the reason a chatty sensor does not.

The model is Cisco ASA style: rules belong to one interface and one direction, they are evaluated
in order, and **ingress ends in an implicit deny**. If no ingress rule matches, the message is
dropped. A bridge with no rules at all forwards nothing.

## Writing your first rule

The minimum useful rule is "take text from the mesh and forward it to the satellite".

```json
{
  "name": "mesh text to Iridium",
  "interface_id": "mesh_0",
  "direction": "ingress",
  "action": "forward",
  "forward_to": "iridium_0",
  "priority": 100,
  "filters": "{\"portnums\":\"[1]\"}",
  "rate_limit_per_min": 4,
  "rate_limit_window": 60,
  "enabled": true
}
```

`filters` is a JSON string inside the rule, not a nested object. Port number 1 is Meshtastic text;
telemetry is 67. Without the filter this rule would put every telemetry frame on a paid bearer.

Create it with `POST /api/access-rules`. The full endpoint list is on the
[access rules API page](/api/rules).

## The filters

| Filter | Matches |
|---|---|
| `keyword` | the message text contains this substring, case insensitive |
| `channels` | JSON array of mesh channel numbers, `"[0,2]"` |
| `nodes` | JSON array of sender IDs, `"[\"!a4c138f0\"]"` |
| `portnums` | JSON array of port numbers, `"[1,67]"` |

An empty filter set matches everything. Filters combine with AND: a rule with both a keyword and a
channel list fires only when both hold.

Malformed filter JSON is treated as permissive rather than as a match failure, so a typo opens a
rule up rather than closing it. Read a rule back after editing it by hand.

## Object groups instead of repeated lists

`filter_node_group`, `filter_sender_group` and `filter_portnum_group` reference a named set
instead of an inline list. Define "the search team's handsets" once and point six rules at it. A
`contact_group` resolves to phone numbers, and the special member `auto_fwd` expands to every SMS
contact with auto-forwarding on, so the group tracks the contact list rather than a snapshot of it.

## The three actions

| Action | Effect |
|---|---|
| `forward` | queue a copy for `forward_to`, then keep evaluating |
| `drop` | stop immediately; nothing is forwarded, later rules never run |
| `log` | record the match and keep evaluating |

`forward` does not stop evaluation, so two matching forward rules produce two copies on two
bearers. That is how you fan a message out deliberately. `drop` does stop, which is why an
over-broad drop rule placed high in the order silently disables everything under it.

## Egress is the other half, and it behaves differently

Ingress asks "should this message enter the router". Egress asks "may this message leave on this
interface". The asymmetry to remember:

- An interface with **no** egress rules allows everything out.
- An interface with **one** egress rule allows only what that rule matches.

So adding your first egress rule to an interface is not an incremental tightening. It flips that
interface from open to closed, and everything you did not think to match stops leaving.

## Loop prevention

A rule that forwards an interface back to itself is skipped. Beyond that, every message carries
the set of interfaces it has already visited, and a rule forwarding to one of them is skipped too.
This is what stops two bridges configured as each other's relay from playing a message back and
forth forever.

## Rate limits are a spend control

`rate_limit_per_min` and `rate_limit_window` cap how often one rule may fire. They are a token
bucket: `rate_limit_per_min` is the bucket size, and it refills over `rate_limit_window` seconds.
`4` and `60` means four messages, refilling at four a minute, so a burst of four is allowed and
the fifth waits.

The limiter is per rule, not per sender, and a rate limited rule is treated as not matching:
evaluation continues to the next rule rather than the message being dropped outright.

Use it wherever a rule can put traffic on a paid bearer. One enthusiastic telemetry node is enough
to produce a satellite bill nobody authorised.

## Scheduling

`schedule_type` limits when a rule is in force. The case it exists for is expensive bearers:
forward telemetry over satellite during a working window and hold it the rest of the day, without
anyone enabling and disabling a rule by hand twice a day.

## An SOS is not subject to any of this

`POST /api/sos/activate` does not go through the router. It sends straight to the mesh transport
and to the Iridium gateway, three times, bypassing the dispatcher and therefore every access rule
you have written. You cannot accidentally configure an SOS into silence.

## When nothing arrives

Almost always the implicit deny. Check, in order:

1. Is there an ingress rule on the interface the message actually arrived on?
2. Does its `interface_id` match the instance ID (`mesh_0`), not the channel type (`mesh`)?
3. Is `enabled` true?
4. `GET /api/access-rules/{id}/stats` reports how often a rule has fired. A load bearing rule with
   a zero counter is not matching what you think it is.
5. If the message leaves the router but never appears at the far end, the problem is egress on the
   destination interface, not ingress on the source.

## Related

- [Policy engine](/architecture/policy-engine) for the data model behind these rules.
- [Access rules API](/api/rules) for the endpoints.
- [Transforms](/guide/features/transforms) for what happens to a message after a rule accepts it.
- [Failover](/guide/features/failover) for pointing `forward_to` at a group rather than one bearer.
