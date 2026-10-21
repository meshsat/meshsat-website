---
description: "This guide walks you through installing MeshSat, connecting your first device, and sending a test message."
---

# Quick start

This guide walks you through installing MeshSat, connecting your first device, and sending a test message.

## Before you begin

Have these ready:

- A **64-bit ARM64 or x86_64 Linux** machine, a working internet connection and sudo access.
- `bash` and `curl`. The installer adds Docker and Compose if needed. Install `jq` with your distribution's package manager for the API checks below.
- One USB Meshtastic radio, a data-capable cable and a second radio on the same region and channel to confirm reception.
- A browser on the same trusted network as the Linux machine.

No satellite modem, airtime account or Hub account is needed for this mesh-only test.
The Bridge is prototype software; use this walkthrough as a bench test.

## 1. Install MeshSat

```bash
curl -fsSL https://get.meshsat.net | sudo bash
```

Wait until the installer reports **MeshSat Bridge is ready**. It checks `/health` before
reporting success. A new installation uses port 6050 and stores data in `/meshsat/data`.

Rerunning the installer preserves `/meshsat/docker-compose.yml`. To deliberately replace
it with the standard configuration, download and inspect the script, then run it with
`sudo bash meshsat-install.sh --replace-config`. The previous configuration receives a dated
backup. See [installer verification](https://meshsat.net/security/#verify-the-installer-before-you-run-it) before running a downloaded script.

## 2. Open the Dashboard

Open your browser and navigate to:

```
http://<your-device-ip>:6050
```

The dashboard shows the status of all configured transports and recent message activity.

## 3. Connect a Meshtastic Radio

Plug a Meshtastic radio (LILYGO T-Echo, Heltec LoRa V4, and the others in the hardware guide) into a USB port on your device. MeshSat will auto-detect the serial port and begin receiving mesh messages.

Run the following commands on the Linux machine running the Bridge. They use `curl` and `jq`;
if you run them from another machine, replace `localhost` with the Bridge's IP address.

You can verify the mesh connection via the API:

```bash
curl -fsS http://localhost:6050/api/status | jq .
```

Look for `"connected": true`. If the radio is disconnected, check its USB connection and the
[troubleshooting guide](/guide/troubleshooting).

## 4. Send a Test Message

Send a test message through the mesh radio. Have a second Meshtastic device on the same
channel ready to confirm reception:

```bash
curl -fsS -X POST http://localhost:6050/api/messages/send \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello from MeshSat!","channel":0}'
```

With no `gateway` or `to` specified, this sends to everyone on mesh channel 0. A successful API
response means the Bridge handed the message to the radio; check that it arrives on your second
device. This confirms the mesh send path. To test forwarding between transports, configure
[access rules](/guide/features/access-rules), send an incoming mesh message, and check the
chosen destination. Routes to satellite or SMS can spend airtime.

## 5. View Message History

Check that the message was recorded:

```bash
curl -fsS 'http://localhost:6050/api/messages?limit=10' | jq .
```

## If the test fails

- **Installer exits:** read its last error. It retains the configuration and data; correct the problem before retrying.
- **Dashboard does not open:** run `cd /meshsat && sudo docker compose ps` and `sudo docker compose logs --tail=80`. Check the host's IP address and configured port.
- **Radio stays disconnected:** check that the USB cable carries data and that another program is not using the serial device.
- **Send succeeds but nothing arrives:** check both radios' region, channel and channel key. Confirm reception on the second radio before adding routing rules.

See [troubleshooting](/guide/troubleshooting) for the next diagnostic steps.

## Next Steps

- [Configuration](/guide/configuration): Add more transports and define routing policies
- [Transports](/transports/): Learn about all supported transport types
- [Architecture](/architecture/): Understand how the policy engine and transform pipeline work
