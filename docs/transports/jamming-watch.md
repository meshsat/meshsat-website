# Jamming watch

<ChannelStatus code="live">Runs on both kits. It has only ever seen ambient noise, never a real jammer.</ChannelStatus>

A kit carries an RTL-SDR receiver that transmits nothing. The Bridge uses it to watch the bands
its own radios work on. When a band looks jammed, the interface on that band gets a health score
of zero, which is how the router learns to stop trying it. How it decides is on
[Field intelligence](/guide/features/field-intelligence#spectrum-monitoring).

This is a receive-only channel: it carries no messages. It tells the router which of the other
channels to stop trusting.

## What has been run

The spectrum monitor runs on both kits and classifies what it hears.

## Not tested yet

A real jammer. The detector is implemented and tested against ambient noise only. Whether it
recognises deliberate jamming, and how fast, is unknown.

## Good to know

While the [10 m HF gateway](/transports/hf-10m) is receiving, it holds the RTL-SDR and the
jamming watch is blind until the gateway stops.

## Related

- [Field intelligence](/guide/features/field-intelligence)
- [Failover](/guide/features/failover)
