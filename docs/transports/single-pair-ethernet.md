# Single-pair copper

<ChannelStatus code="future-plan">Nothing is bought. This page describes a plan.</ChannelStatus>

10BASE-T1L is Ethernet over a single twisted pair: 10 Mbit/s over up to 1,000 m of cable (IEEE
802.3cg). Like [fiber](/transports/fiber) it has no radio in it, so it cannot be jammed or
located from the air.

Fiber is faster and carries no lightning. Copper wins in three cases: when a pair of wires is
already on site, when the cable has to be repaired in the field with a knife and tape, and when
the far end should be powered over the same pair. It can also be tapped, which fiber makes much
harder.

It carries IP, so Reticulum runs over it with no new code in the Bridge.

## What we plan to test, and how

Nothing is ordered, and the adapters are not chosen. The plan, once they are:

1. Check that the kit's kernel already has the adapter's driver. A kit's kernel is never changed
   for this: without the driver, the adapter stays a bench tool.
2. On the bench: link, `iperf3` throughput and errors at each cable length.
3. Run Reticulum over the link.
4. Before anything goes near a kit: a route for the pair through the case wall, and an interface
   that never takes the default route.

The cable for the first tests is an outdoor network cable whose four pairs are chained into one
long pair of about 200 m. That is enough to test adapters, driver and routing. It does not answer
how far the link reaches; thin field wire will fall short of the standard's 1,000 m, and only a
measurement on the real cable settles it.

## Good to know

10BASE-T1S, the short-reach variant found on some small adapters, does not talk to 10BASE-T1L.

## Not tested yet

Everything.
