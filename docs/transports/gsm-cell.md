---
description: "Tested on the bench under a licence: two phones joined our cell and sent texts and made calls both ways. The Bridge runs the cell and has the gateway for its texts. Not in a kit yet."
---

# Own 2G cell

<ChannelStatus channel="gsm-cell">Tested on the bench under a licence: two phones joined our cell and sent texts and made calls both ways. The Bridge runs the cell and has the gateway for its texts. Not in a kit yet.</ChannelStatus>

When the mobile network is down, the one thing a kit cannot reach is the phone in someone's
pocket. The idea: the kit runs a small 2G cell of its own, ordinary phones join it and send a
text, and the kit carries the message out over satellite or radio. It is an idea for relief
work, where 2G phones are what people have.

::: danger A licence, everywhere
Transmitting on mobile frequencies needs a licence in every country, and in the Netherlands those
frequencies belong to the mobile operators. Our tests run under an experimental licence from the
RDI, the Dutch radio authority, for one location and at low power, and every transmission is
logged. A kit anywhere else keeps its cell off.
:::

## The hardware

For the bench only, not for a kit:

- A software-defined radio that can send and receive at the same time, which a base station
  must. The software radio in a kit only receives.
- Programmable test SIM cards and a card reader.
- A shielded bag.
- [Osmocom](https://osmocom.org/), the open source mobile network software, on a laptop.

## What was tested, on the bench (12 and 13 October 2026)

- A cell on our licensed channel in the 1800 MHz band, at low power.
- Two phones, a Pixel 9a and a Caterpillar, joined it with our own SIM cards.
- Texts both ways and voice calls between them.
- Runs of several hours with both phones on the cell.
- The Bridge starting and stopping the cell by itself, and its SMS gateway connecting to the cell.

## Between the bench and a kit

- Plugging the radio into a kit and running it there.
- A text from a phone on the cell carried out over the mesh or by satellite, and a reply back.
- The radio's power draw on a kit's battery.
- 2G security is weak by design: a phone cannot check which network it joins. This is a way for
  people to reach help, not a secure channel.
- A cell transmits all the time, so it is easy to find.

## Not tested yet

- A text relayed from the cell onto the mesh or satellite, end to end.
- Long texts, special characters and delivery receipts.
- Anything in a kit.
