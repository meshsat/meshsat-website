# TETRA Direct Mode

<ChannelStatus code="coming-soon">Two handheld radios are on their way to the bench. There is no TETRA code in the Bridge and no test has run.</ChannelStatus>

TETRA is the digital radio many emergency services carry. In Direct Mode (DMO) two TETRA radios
talk to each other with no network between them, and they can exchange short text messages. The
idea is a gateway: a text or a position from a TETRA radio leaves over LoRa or Iridium through a
kit, and the answer comes back.

::: danger Not a link to any emergency-services network
This is two of our own radios talking to each other in Direct Mode. It does not connect to C2000
or to any other public-safety network, and it is not meant to.
:::

## The hardware

Two Motorola MTP3550 handhelds, 350 to 470 MHz. Each has a USB data port that Linux drives with
its `motorola_tetra` serial driver, and the radio answers the AT commands of ETSI EN 300 392-5
for short data (`AT+CTSDS`, then `AT+CMGS`).

What we know before they arrive:

- In Direct Mode, Motorola supports text messages only, in its own format.
- Each radio needs a one-time setup with Motorola's programming software on Windows. After that
  the Bridge would drive it from Linux.
- Clear mode only, no encryption.

## What we plan to test, and how

The test plan is not written yet. What is settled:

- **Bench first, on a cable.** The two radios are connected through coax and attenuators, so
  nothing is radiated while the commands and the message format are worked out.
- **On air only on amateur frequencies**, on 70 cm, by a licensed operator, following the Dutch
  amateur convention for Direct Mode.
- The Bridge side does not exist. A gateway that turns a TETRA short message into a MeshSat
  message, and back, is work that starts when the radios answer on the bench.

## Between the bench and a kit

- An amateur licence and a callsign for any transmission.
- The one-time setup of each radio.
- A handheld TETRA radio is a strong transmitter next to the kit's other radios. Nothing is known
  yet about how they affect each other.

## Not tested yet

Everything. No radio has been on our bench.
