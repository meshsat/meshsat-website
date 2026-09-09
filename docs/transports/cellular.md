# Cellular

SMS and data over a USB cellular modem: Huawei E220, SIM7600, Quectel EC25 and similar sticks.

## Why SMS and not just data

SMS survives conditions data does not. A single bar of signal that cannot hold a TCP connection
will often still carry a text. On a bearer chosen for when things have gone wrong, that matters
more than throughput.

## How the bridge talks to it

One goroutine owns the serial port exclusively and runs an I/O loop, reading unsolicited result
codes (`+CMTI` for an arriving message, `+CBM` for cell broadcast) between short read timeouts
while processing queued AT commands. Everything else in the bridge, including signal polling, the
API and outbound sends, submits through that loop rather than touching the port.

The design is deliberate: two writers on one AT modem interleave their commands and responses and
produce answers that belong to the other caller's question.

## Signal

The bridge polls signal strength and reports it as bars alongside the raw value, so a degrading
link is visible before it fails rather than after.

## SIM and cost

Your own SIM, your own bill. The Hub does not resell SMS. If you use Twilio for outbound SMS from
the Hub rather than from a modem, those are your Twilio credentials too, added under
[Provider accounts](/hub/provider-accounts).
