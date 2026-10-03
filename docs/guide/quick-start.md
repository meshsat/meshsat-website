# Quick Start

This guide walks you through installing MeshSat, connecting your first device, and sending a test message.

## 1. Install MeshSat

```bash
curl -fsSL https://get.meshsat.net | sudo bash
```

Wait for the installation to complete. MeshSat will start automatically on port 6050.

## 2. Open the Dashboard

Open your browser and navigate to:

```
http://<your-device-ip>:6050
```

The dashboard shows the status of all configured transports and recent message activity.

## 3. Connect a Meshtastic Radio

Plug a Meshtastic radio (T-Echo, Heltec V3, etc.) into a USB port on your device. MeshSat will auto-detect the serial port and begin receiving mesh messages.

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

## Next Steps

- [Configuration](/guide/configuration) — Add more transports and define routing policies
- [Transports](/transports/) — Learn about all supported transport types
- [Architecture](/architecture/) — Understand how the policy engine and transform pipeline work
