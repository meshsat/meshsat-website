# Field intelligence

A bridge in the field is not just a relay. It watches its own links, its radio environment and the
people carrying its nodes, and it acts on what it sees. These are the features that do the
watching.

## Geofences

A geofence is a polygon and a rule about crossing it.

```bash
curl -X POST http://bridge:6050/api/geofences \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "base-camp",
    "name": "Base camp perimeter",
    "polygon": [{"lat":60.39,"lon":5.32},{"lat":60.40,"lon":5.32},{"lat":60.40,"lon":5.34}],
    "alert_on": "exit",
    "message": "{node} has left base camp"
  }'
```

| Field | Notes |
|---|---|
| `id` | required, yours to choose |
| `polygon` | at least three vertices, ordered |
| `alert_on` | `enter`, `exit`, or `both`, defaulting to `both` |
| `message` | the alert text |

The monitor tracks each node's inside or outside state per zone and fires only on the transition,
so a node sitting on the boundary does not generate a stream of alerts. `GET /api/geofences` lists
zones and `DELETE /api/geofences/{id}` removes one.

## Spectrum monitoring

With an RTL-SDR attached, the bridge scans the bands its own interfaces use and compares them
against a learned baseline. It reports one state per band:

| State | Meaning |
|---|---|
| `clear` | at or near baseline |
| `degraded` | sustained elevation, not yet characteristic of interference |
| `interference` | something is transmitting in your band |
| `jamming` | the pattern looks deliberate |
| `calibrating` | still building a baseline |
| `disabled` | no scanner |

The bands ship pre-tuned to the interfaces they matter to: LoRa EU868 for `mesh_0`, APRS 144.8 MHz
for `ax25_0`, GPS L1 for `gps_0`, LTE for `cellular_0`.

This is not only a display. A band in the `jamming` state forces its interface's health score to
zero, which is how the router learns to stop trying. Endpoints: `/api/spectrum/status`,
`/api/spectrum/hardware`, `/api/spectrum/history`, and `/api/spectrum/stream` for a live feed.

## Channel health

Every interface carries a composite score from 0 to 100, blending signal, delivery success,
latency and cost, with jamming and a deaf receiver forcing it to zero. `GET /api/interfaces/health`
returns them.

The scores are diagnostic: they tell you what your [failover](/guide/features/failover) priorities
should be, and they are where an interface that is quietly failing shows up before anyone notices
the missing messages.

## Opportunistic satellite burst

A satellite pass is short and an SBD frame is 340 bytes whether you fill it or not. The burst queue
holds low urgency messages and packs several into a single frame when the window opens, using a
simple length prefixed format so the far end can unpack them.

Defaults are ten pending messages and a thirty minute maximum age, whichever comes first.
`GET /api/burst/status` reports pending, size and age limits; `POST /api/burst/flush` sends
immediately without waiting for either.

Pair it with the [pass scheduler](/guide/features/passes), which is what tells the queue that a
window has opened.

## Mesh topology

`GET /api/topology` returns the mesh as a graph: nodes with battery, position and last seen, links
with the signal-to-noise ratio measured on them, and totals including the average SNR across the
network. A node counts as online if it has been heard in the last 15 minutes. The web UI draws it
as a force directed graph and refreshes every 30 seconds.

It answers a question no table answers well, which is whether your mesh is one network or two, and
which single node the rest of it depends on.

## Dead man's switch

::: danger Not currently a safety mechanism
The switch arms, counts down, and reports `triggered` through `GET /api/deadman`. **It does not
send anything when it fires**, and only saving its own configuration resets the timer, not your
activity. The Settings page describes behaviour the Bridge does not yet have.

Do not rely on it. This is tracked as MESHSAT-996 and this page will be updated when it is fixed.
For a dead man's switch that does escalate today, use the
[Hub's SOS and escalation](/hub/sos-and-escalation).
:::

`POST /api/deadman` takes `enabled` and `timeout_min` (default 240, minimum 1). `GET /api/deadman`
reports `enabled`, `timeout_min`, `last_activity` and `triggered`. The switch checks itself once a
minute and fires at most once per arming.

## What a manual SOS does

`POST /api/sos/activate` is the path that works, and it is deliberately blunt. It sends a broadcast
on the mesh and a message through the Iridium gateway, three times at 30 second intervals, going
directly to the transports rather than through the router. No access rule, rate limit or transform
can intercept it. When the Hub link is down it also sends a Hub uplink frame over satellite or SMS,
so the Hub raises the alarm too.

`POST /api/sos/cancel` stops the repeats. `GET /api/sos/status` reports whether it is active and
how many sends have gone out. Every activation is written to the signed audit log with the trigger
that caused it.

## Related

- [Failover](/guide/features/failover) for how health scores translate into bearer choice.
- [Satellite passes](/guide/features/passes) for the window the burst queue waits on.
- [SOS and escalation](/hub/sos-and-escalation) for what the Hub does with an alert once it arrives.
