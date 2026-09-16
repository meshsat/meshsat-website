# Troubleshooting

Things that go wrong on real hardware, and what they usually mean.

## No devices detected on startup

Check the operating system sees them at all:

```bash
ls /dev/ttyACM* /dev/ttyUSB*
lsusb
```

If the device is missing from `lsusb`, the problem is below MeshSat: cable, port or power. USB cables
are the usual culprit, and a surprising number of them are charge-only with no data lines. Try a
different cable before anything else.

If the device appears in `lsusb` but not as a `tty`, the kernel has no driver bound for it. On a
minimal host install the CH340, CP210x and FTDI modules may not be present.

## Meshtastic connects but shows 0 nodes

The configuration handshake takes 5 to 10 seconds. Wait for `config complete` in the log. If it never
arrives, the radio is probably answering on a different baud rate or the port is claimed by another
process.

## The radio is connected but nothing arrives

Check that both ends share a channel and a pre-shared key. Two radios on the same frequency with
different keys look connected and exchange nothing readable.

## Iridium shows 0 bars

The antenna needs a genuinely clear view of the sky. A window is not enough, and neither is a
skylight at an angle. Check the antenna connector is seated, then take the antenna outside.

For the 9603N, also check the GPIO pins if you have configured any. A sleep pin left asserted holds
the modem off.

## ZigBee dongle detected as Meshtastic

The SONOFF dongle shares a VID:PID with some Meshtastic boards. Pin it explicitly:

```
MESHSAT_ZIGBEE_PORT=/dev/ttyUSB1
```

The full detection cascade is described under [Hardware Setup](/guide/hardware).

## A serial device goes silent and a reboot does not fix it

On many single-board computers USB VBUS stays powered across a warm reboot, so the device firmware
never resets. The host reboots, the device does not, and it comes back in the same wedged state.

Cut power properly instead. A switchable USB hub, the power switch on the device, or unplugging it.
If you have a per-port switchable hub, MeshSat can do this for you as part of the device health
ladder.

## Messages queue but never leave

Look at the delivery ledger rather than the log. Every outbound message becomes a row with a status,
a retry count and a backoff, and the dashboard shows it:

```bash
curl -s http://localhost:6050/api/deliveries | jq .
```

A row stuck at `retry` usually means the bearer is up but the far side is not acknowledging. A row
stuck at `queued` means the worker for that interface is not running, which is a gateway problem, not
a routing one.

## A message arrives twice

Check whether two rules match it. Rules do not stop at the first match by design, because fan-out to
several bearers is a normal thing to want, so two overlapping rules deliver two copies. Add a filter
or an object group to make them exclusive.

## The dashboard loads but the API returns 404

The API is served under `/api`, not `/api/v1`. There is no versioned prefix.

## Nothing in this list matches

Collect the log and the interface state before asking:

```bash
docker logs --tail 200 meshsat
curl -s http://localhost:6050/api/interfaces | jq .
curl -s http://localhost:6050/api/devices/health | jq .
```

Then open an issue on
[github.com/meshsat/meshsat](https://github.com/meshsat/meshsat/issues) with the hardware you are
using. The supported-devices table is short because it only lists what has actually been run, so a
report about untested hardware is useful rather than unwelcome.
