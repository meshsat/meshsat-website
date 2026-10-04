# Cell broadcast alerts

<ChannelStatus code="code">The Bridge can receive and store them. We have no record of an alert received on a kit.</ChannelStatus>

Cell broadcast is how mobile networks push public warnings to every phone in an area: NL-Alert
and the other EU-Alert systems, and the wireless emergency alerts in the United States. A
cellular modem hears them like a phone does.

The Bridge's [cellular](/transports/cellular) channel listens for them on the same modem that
carries SMS, and stores what arrives. It is receive only: the kit cannot send a broadcast.

## What we plan to test, and how

The test plan is not written yet. What it has to show: an alert reaches a kit that is switched
on and in coverage, and it is stored with its text.

## Not tested yet

Any alert on a kit.

## Related

- [Cellular](/transports/cellular)
