# Devices

A device is a thing that sends and receives messages: an Iridium modem with an IMEI, an Android
phone running the app, a Meshtastic node reached through a bridge.

## Registering one

Open **Devices** and add it. An IMEI is required; a label is not, but a device called
`300234065000001` is hard to recognise on a map at three in the morning, so give it a name.

Bridges register their own devices. When a bridge reports a device it has not seen before, the
Hub adds it for you.

## What counts against your plan

Devices and bridges share one number. Two bridges and two phones fills the free plan of four.

Markers that the TAK integration mirrors in do not count. They arrive on their own from a TAK
server, nobody bought them, and billing you for a busy TAK feed would charge you for traffic you
did not create.

If you are at your limit, registering the next device is refused with a message saying so.
Everything already registered keeps working. See [Accounts and plans](/hub/accounts).

## Removing one

Deleting a device frees its place immediately. Its message history stays until you delete that
separately; see [Your data](/hub/your-data).
