---
description: "Register and manage modems, phones and radio devices in MeshSat Hub, including identifiers and device status."
---

# Devices

A device is a thing that sends and receives messages: an Iridium modem with an IMEI, an Android
phone running the app, a Meshtastic node reached through a bridge.

## Registering one

Open **Devices** and add it. An IMEI is required: the modem's 15 digits, or the ESN of a Globalstar
unit. A phone number cannot be registered as a device. A label is optional, but a device called
`300234065000001` is hard to recognise on a map at three in the morning, so give it a name.

Bridges register their own devices. When a bridge reports a device it has not seen before, the
Hub adds it for you.

A device belongs to one workspace, and its traffic has to arrive in that workspace. If a kit reports
a modem registered in another workspace, the Hub ignores what it sends for that modem until the
modem is moved.

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
