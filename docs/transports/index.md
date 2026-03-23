# Transports

MeshSat supports 11 transport types across four categories. Each transport handles the protocol-specific details of sending and receiving messages, while the policy engine handles routing between them.

## Mesh Networks

| Transport | Interface | Status | Description |
|-----------|-----------|--------|-------------|
| [Meshtastic](/transports/meshtastic) | Serial / USB | Stable | LoRa mesh radios (T-Echo, Heltec, RAK, etc.) |
| [ZigBee](/transports/zigbee) | Serial / USB | Beta | IEEE 802.15.4 mesh via ZigBee coordinator dongles |

## Satellite

| Transport | Interface | Status | Description |
|-----------|-----------|--------|-------------|
| [Iridium SBD](/transports/iridium-sbd) | Serial | Stable | Short Burst Data via RockBLOCK 9603N |
| [Iridium IMT](/transports/iridium-imt) | Serial | Beta | Internet Modem Transceiver via RockBLOCK 9704 |
| [Astrocast](/transports/astrocast) | Serial | Planned | LEO nanosatellite IoT network |

## Cellular

| Transport | Interface | Status | Description |
|-----------|-----------|--------|-------------|
| [Cellular](/transports/cellular) | Serial / USB | Stable | SMS and data via USB cellular modems (Huawei E220, etc.) |

## IP Networks

| Transport | Interface | Status | Description |
|-----------|-----------|--------|-------------|
| [MQTT](/transports/mqtt) | TCP/TLS | Stable | Publish/subscribe messaging over MQTT brokers |
| [Webhooks](/transports/webhooks) | HTTP/HTTPS | Stable | Incoming and outgoing HTTP webhooks |
| [APRS](/transports/aprs) | TCP (APRS-IS) | Beta | Amateur Packet Reporting System for position and telemetry |
| [TAK](/transports/tak) | TCP/TLS | Beta | Team Awareness Kit (ATAK/WinTAK) CoT integration |

## Transport Lifecycle

Every transport follows the same lifecycle:

1. **Init** — Transport is created with its configuration
2. **Connect** — Underlying connection is established (serial port opened, TCP connected, etc.)
3. **Run** — Transport listens for incoming messages and accepts outgoing sends
4. **Reconnect** — On connection loss, transport automatically retries with exponential backoff
5. **Shutdown** — Graceful disconnect on process exit

## Common Features

All transports share these capabilities:

- **Auto-detection** — Serial transports can auto-detect device ports on USB hotplug
- **Health checks** — Each transport reports its connection status via the API
- **Metrics** — Per-transport message counts, latency, and error rates
- **Dead letter queue** — Failed sends are queued for retry with configurable TTL
- **Message transforms** — Payloads can be transformed before sending (compression, encoding, format conversion)

## Next Steps

Select a transport above for detailed configuration and usage instructions, or see the [Architecture](/architecture/) section to understand how transports interact with the policy engine.
