---
description: "Every time a radio or modem on the MeshSat field kits locked up: which device, when, what cleared it and whether the case had to be opened, published with the kits' powered hours."
---

# Device reliability log

The two MeshSat field kits record their own device trouble. A watchdog in the Bridge checks every radio and modem every 30 seconds. When one stops answering it tries the resets an engineer would, one step at a time: reconnect, the device's own reset, a cut of its USB port. Every step goes into the kit's audit log, where each row carries the hash of the row before it.

## What is published

The log of both kits since automatic logging began on 5 September 2026. There is one record per wedge, meaning a device that stops answering until something resets it, with what cleared it and whether the case had to be opened. The kits' powered hours are published with it.

Wedges from before September, and on devices the watchdog does not watch such as the touch display, come from the project's notes and are marked as such. A fix done by hand and a device taken out of the kit are recorded on the kit itself, in the Bridge web app under Interfaces, Devices.

## The evidence

- The published log, its method and its limits: [docs/evidence/device-log](https://github.com/meshsat/meshsat/tree/main/docs/evidence/device-log)
- The script that reads the kits and builds the log: [scripts/device-log](https://github.com/meshsat/meshsat/tree/main/scripts/device-log)

## Limits

Software cannot tell a hand from a device that came back by itself. What a person did is in the log only when someone noted it on the kit or in the project's notes. Until 13 November 2026 the watchdog did not log a device that left the USB bus while wedged, so some readings of older rows are inferences, and they are marked. The kits' system journals go back to 13 September 2026; powered time before that was not recorded.

The work is part of the SIDN fonds project for practical emergency communications.
