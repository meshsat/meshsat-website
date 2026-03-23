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

You can verify the connection via the API:

```bash
curl -s http://localhost:6050/api/v1/transports | jq .
```

You should see your Meshtastic transport listed with status `connected`.

## 4. Send a Test Message

Send a test message through the API to verify routing is working:

```bash
curl -X POST http://localhost:6050/api/v1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "transport": "meshtastic",
    "destination": "^all",
    "payload": "Hello from MeshSat!"
  }'
```

The message will be transmitted over your Meshtastic radio to all nodes in range.

## 5. View Message History

Check that the message was recorded:

```bash
curl -s http://localhost:6050/api/v1/messages?limit=10 | jq .
```

## Next Steps

- [Configuration](/guide/configuration) — Add more transports and define routing policies
- [Transports](/transports/) — Learn about all supported transport types
- [Architecture](/architecture/) — Understand how the policy engine and transform pipeline work
