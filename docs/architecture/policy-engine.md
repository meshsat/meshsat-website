# Policy engine

The policy engine decides what happens to every message: whether it is forwarded, where to, and
whether it is dropped. Rules are per interface and per direction, and they are evaluated in
priority order.

## An access rule

| Field | Meaning |
|---|---|
| `interface_id` | which interface this rule belongs to |
| `direction` | ingress or egress; a rule applies to one, never both |
| `priority` | lower numbers are evaluated first, default 100 |
| `action` | `forward` or drop |
| `forward_to` | the destination interface when forwarding |
| `filters` | what the message must match |
| `schedule_type` | when the rule is in force at all |
| `qos_level` | delivery quality for the forwarded copy |
| `rate_limit_per_min` | ceiling on how often this rule may fire |
| `enabled` | off without deleting it |

## Object groups

`filter_node_group`, `filter_sender_group` and `filter_portnum_group` point at object groups:
named, reusable sets of nodes, senders or port numbers. Define the set once and reference it from
every rule that needs it, rather than repeating a list in each and having them drift apart.

## Direction is not symmetric

A rule is ingress or egress, never both, and the same interface usually needs different rules in
each direction. What you accept from a mesh is not what you are willing to send back out over a
satellite link that costs money per message.

## Scheduling

A rule can be limited to a time window. The obvious use is expensive bearers: forward telemetry
over satellite during working hours and hold it otherwise, without disabling the rule by hand
twice a day.

## Rate limits

`rate_limit_per_min` bounds how often a single rule fires. It exists because a chatty mesh node
can turn one enthusiastic sensor into a satellite bill. A rate limit on a rule is a spend control,
not a performance control.
