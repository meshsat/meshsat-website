# Safety

::: danger Not an emergency service
MeshSat is a research prototype, not a replacement for 112, 911 or any national emergency
number. It has never been used in a real emergency.
:::

## SOS

SOS sends three alerts 30 seconds apart: over the mesh, by satellite if the modem is connected
at that moment, and by SMS to your kit's phone number (Setup > SMS). It is on Home: **ARM SOS**
asks you to confirm, the card then counts the sends, and **CANCEL SOS** stops them.

A rework is in progress: hold to send, a list of emergency contacts, and alerts that go through
the retrying satellite queue. Until it ships, SOS works as described here.

<div class="phone-shots">

![Safety: zones, and the check-in timer, a dead man's switch that sends SOS when there is no activity within the timeout](/images/android/safety.webp)
Safety: zones and the check-in timer.

</div>

## Check-in timer

The check-in timer is a dead man's switch. Switch it on in Setup > Safety, and the app sends SOS
by itself if it sees no activity from you (sending a message, pressing a button) within the
timeout.

## Zones

Zones record when a mesh node enters or leaves an area. Setup > Safety > Zones.

## On the Hub

The satellite leg of an SOS lands at the [Hub](/hub/). What the Hub does with an SOS, and how to
decide who gets called and who next if nobody answers, is on
[SOS and escalation](/hub/sos-and-escalation).
