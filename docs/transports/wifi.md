# WiFi

<ChannelStatus code="live">Each kit's own WiFi is its way to the internet today. The WiFi link between the two kits is built and switched off.</ChannelStatus>

WiFi does two different jobs on a kit, and only one of them runs today.

## The uplink: live

The Raspberry Pi's built-in WiFi joins whatever network is in reach. Everything a kit does over
IP rides on it: the [Hub link](/transports/hub-link), [MQTT](/transports/mqtt),
[TAK](/transports/tak), [Reticulum](/guide/features/reticulum) over TCP, and management. It is
excellent while there is a network to join and useless without one, which is why the other
channels exist.

## Kit to kit: built, switched off

Each kit also carries a second WiFi adapter on USB (a MediaTek MT7612U) for a direct link between
the two kits, with no access point between them. The link was built and proven once: it carried
a Reticulum peer in both directions.

It is switched off on both kits. Without external antennas the second adapter drowned out the
built-in radio. The antennas were fitted to the cases on 14 September 2026, and the link has not
been tested again since.

## What we plan to test, and how

The test plan is not written yet. What it has to show: with the antennas fitted, the kit-to-kit
link comes up, the built-in WiFi keeps working beside it, and a Reticulum peer passes traffic
both ways. The estimated range is on [Radios and range](/guide/radios-and-range).

## Not tested yet

- The kit-to-kit link with its antennas.
- Any range. Every WiFi distance in these docs is an estimate.

## Related

- [Radios and range](/guide/radios-and-range)
- [Wi-Fi HaLow](/transports/halow), the long-reach relative
