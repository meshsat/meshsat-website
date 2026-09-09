# Satellite passes

An Iridium satellite is overhead for a few minutes at a time. The pass scheduler predicts when,
and moves the bridge through four modes so that power and airtime are spent inside a window rather
than against a closed sky.

The state machine is described on the [pass scheduler](/architecture/pass-scheduler) page. This
page is how to configure and read it.

## Tell it where you are

Predictions need a ground position. Register one or more locations:

```
GET    /api/iridium/locations
POST   /api/iridium/locations
DELETE /api/iridium/locations/{id}
```

Without a location the scheduler stays idle and the gateway falls back to fixed intervals. This is
the single most common reason the scheduler reports nothing useful.

## Tell it where the satellites are

Orbital elements come from Celestrak's Iridium NEXT set and are refreshed daily. They are cached in
the bridge's database, so a bridge that loses internet keeps predicting from the last set it has.
Predictions degrade slowly as elements age rather than failing.

```
GET  /api/iridium/passes           upcoming passes
POST /api/iridium/passes/refresh   fetch new elements now
```

Each pass reports its satellite, acquisition and loss of signal times, duration, peak elevation and
azimuth.

## The four modes and what changes

`GET /api/iridium/scheduler` reports the current mode, the next transition and the upcoming passes.

| Mode | When | MT poll | Dead letter retry |
|---|---|---|---|
| Idle | no pass within the pre-wake window | 900 s | 5 min |
| Pre-wake | a pass starts within the window | 60 s | 60 s |
| Active | between acquisition and loss of signal | 20 s | 30 s |
| Post-pass | grace period after loss of signal | 30 s | 30 s |

Pre-wake exists because a cold modem takes time to acquire. Waking at the moment the satellite
arrives means missing the start of a window that may only last a few minutes.

Post-pass exists because loss of signal is predicted, not observed. The grace period covers a pass
that runs slightly longer than the prediction rather than cutting a send off mid-message.

## The knobs

| Setting | Default | What it does |
|---|---|---|
| `pre_wake_minutes` | 5 | how early to warm the modem |
| `post_pass_grace_sec` | 120 | how long to keep going after predicted loss of signal |
| `min_elev_deg` | 5 | passes below this are ignored |
| `idle_poll_sec` | 900 | mobile terminated poll interval between passes |
| `active_poll_sec` | 20 | poll interval while a satellite is overhead |

Raising `min_elev_deg` gives you fewer, better passes. Lowering it gives you more attempts at
worse geometry, which on a paid bearer usually costs more than it delivers.

## Not every pass is worth the same

Passes are scored, and the score is visible in the scheduler response along with a high, medium or
low priority. Three things go into it:

| Input | Weight |
|---|---|
| peak elevation | 50% |
| historical success at similar elevations | 40% |
| duration | 10% |

The historical component is what makes this local rather than theoretical. The bridge groups its
own past attempts into 15 degree elevation bands and uses what actually worked from your site, with
its terrain and its antenna. A new installation starts from an elevation based prior and gets more
accurate as it accumulates history.

## This is scheduling, not queueing

The scheduler decides when the window is. It does not decide what goes into it. What is sent, in
what order, and what happens when a send fails, is the
[dead letter queue](/architecture/dead-letter-queue), and the
[burst queue](/guide/features/field-intelligence) is what packs several small messages into one
frame when a window opens.

## Related

- [Iridium SBD](/transports/iridium-sbd) for the bearer itself.
- [Pass scheduler](/architecture/pass-scheduler) for the design.
- [Failover](/guide/features/failover) for what carries traffic while the sky is closed.
