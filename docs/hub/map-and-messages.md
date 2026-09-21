# Map and messages

## The map

**Map** shows the last known position of everything you own, full screen, drawn on a vector
basemap the Hub serves itself. No tile request leaves for a third party, which matters when the
positions are people.

The list beside the map has everything with a position, newest first; pick one and the map flies
to it and draws its track for the last 24 hours, 7 days or 30 days. The shape says what it is: a
square is a kit, a diamond a satellite device, a circle a mesh node. Older positions fade, a
dashed outline is an approximate Iridium fix (a few kilometres), and only a device with an
unacknowledged SOS is drawn red. Positions arrive from device reports, from kits, and from TAK
markers if you have that integration on.

![The map at country zoom over the Netherlands and Belgium, with the list of positions beside it: a kit, a RockBLOCK and an Iridium 9704 with approximate fixes, and a test device](/images/hub/map-2026-09-21.webp)

## Messages

**Messages** is the log of everything in and out, newest first, with the direction and the bearer
each one took. This is where you look when somebody says a message did not arrive: the log shows
whether the Hub ever had it, and what happened next. Filter it by direction, by bearer or by
text, and download what you see as CSV.

A message the Hub cannot read, because two kits encrypted it end to end, shows as "Encrypted,
45 bytes" rather than as noise. A message that failed shows why.

Send from the panel on the right: to a satellite device (queued at Iridium until the device next
opens a satellite session, on your own Iridium account), or to a phone by SMS. The SMS counter
turns red before a message outgrows one SMS, because a longer one is not delivered, and it warns
when a curly apostrophe or a long dash shrinks the limit from 160 characters to 70.

![Messages: the log filtered to satellite traffic, kit-to-kit messages shown as encrypted with their size, and the send panel with a satellite device picked](/images/hub/messages-2026-09-21.webp)

## Routing

**Routing** decides what happens to a message after it arrives. A rule matches on source and
sends to a destination: another bearer, a kit over satellite, a TAK server, APRS, a webhook, a
notification, or the MQTT fan-out. Every rule that matches fires; switch one off with its toggle
rather than deleting it, and use **Test a route** to see which rules a sample message would fire
without sending anything.

Two things worth knowing before you add a rule:

- A wildcard source matches everything, including test messages. A rule that relays to SMS will
  text a real phone the first time you try anything.
- Delivery happens once per route per message even though the Hub runs more than one replica.

![Routing: what is switched on, satellite to a kit by satellite, APRS, MQTT, notifications, TAK and webhooks, and SMS to SMS, with the rules below it, their conditions blurred](/images/hub/routing-2026-09-21.webp)
