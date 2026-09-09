# Map and messages

## The map

**Map** shows the last known position of everything you own, drawn on a vector basemap the Hub
serves itself. No tile request leaves for a third party, which matters when the positions are
people.

Select a device to see its track. Positions arrive from device reports, from bridges, and from
TAK markers if you have that integration on.

## Messages

**Messages** is the log of everything in and out, newest first, with the direction and the bearer
each one took. This is where you look when somebody says a message did not arrive: the log shows
whether the Hub ever had it, and what happened next.

A message that was compressed shows both sizes. A message that failed shows why.

## Routing

**Routing** decides what happens to a message after it arrives. A rule matches on source and
sends to a destination: another bearer, a TAK server, APRS, a webhook, a notification, or the
MQTT fan-out.

Two things worth knowing before you add a rule:

- A wildcard source matches everything, including test messages. A rule that relays to SMS will
  text a real phone the first time you try anything.
- Delivery happens once per route per message even though the Hub runs more than one replica.
