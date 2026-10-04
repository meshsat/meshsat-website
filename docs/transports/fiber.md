# Fiber

<ChannelStatus code="coming-soon">The media converters and the cable are on their way to the bench. Nothing has been tested.</ChannelStatus>

A fiber between two points has no radio in it: nothing to jam, nothing to locate, and no path
for lightning. It is fixed and point to point, so it suits a link that stays put, such as a kit
and a node on a mast, or two rooms of one building.

It needs no new code in the Bridge. A media converter turns the fiber into ordinary Ethernet, and
Reticulum's UDP and AutoInterface run over any IP link; see [IP mesh](/transports/ip-mesh).

## The hardware

- A pair of single-fiber media converters (TP-Link MC111CS and MC112CS): one strand carries both
  directions, 100 Mbit/s.
- 100 m of outdoor drop cable with SC connectors on both ends.
- Two USB cables that step 5 V up to 9 V, so a converter runs from a kit's USB port or from a
  power bank.

## What we plan to test, and how

1. On arrival: check the voltage and polarity on each converter's label and on the step-up
   cables before anything is plugged in.
2. Bring the link up between two machines on the bench.
3. Measure throughput with `iperf3`.
4. Run Reticulum over the link.

One rule holds throughout: the new interface never takes a kit's default route, and it is never
set up by changing the network configuration over the kit's own WiFi, which is the only way in.

## Between the bench and a kit

A V1 kit has one Ethernet port, inside a sealed case. Until someone opens a case, the converter
sits outside it on a short Ethernet lead, and the pair stays on the bench. The later layout is
one cable through one gland to a small USB-powered switch outside the case, shared with
[Wi-Fi HaLow](/transports/halow). A sealed fiber feedthrough in the case wall is work for the
next kit.

## Not tested yet

Everything.

## Related

- [IP mesh: UDP and AutoInterface](/transports/ip-mesh)
- [Single-pair copper](/transports/single-pair-ethernet), the wired link for copper that is already there
