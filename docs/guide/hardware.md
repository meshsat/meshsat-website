# Hardware Setup

MeshSat runs on any ARM64 or x86_64 Linux machine with USB ports.

## Supported Devices

### Host Computers

| Device | RAM | Notes |
|--------|-----|-------|
| Raspberry Pi 5 | 4-8 GB | Recommended |
| Raspberry Pi 4 | 2-8 GB | Fully supported |
| BananaPi BPI-M4 Zero | 4 GB | Compact, eMMC |
| Any ARM64 SBC | 2+ GB | Docker required |
| x86_64 server | 2+ GB | Docker required |

### Meshtastic Radios

| Device | Chip | Connection |
|--------|------|------------|
| Heltec LoRa V4 | ESP32-S3 + SX1262 | USB-C |
| XIAO ESP32-S3 + SX1262 | ESP32-S3 | USB-C |
| Lilygo T-Echo | nRF52840 | USB-C |
| Lilygo T-Deck | ESP32-S3 | USB-C |
| RAK WisBlock | nRF52840/ESP32 | USB |

### Satellite Modems

| Device | Protocol | Max Message | Connection |
|--------|----------|-------------|------------|
| RockBLOCK 9603N | AT commands (SBD) | 340 bytes | UART/GPIO |
| RockBLOCK 9704 | JSPR (JSON Serial) | 100 KB | USB (FTDI) |
| Astronode S | ASCII hex | 160 bytes | UART |

### Cellular Modems

| Device | Network | Connection |
|--------|---------|------------|
| LILYGO T-Call A7670 | 4G LTE/2G GSM | USB |
| SIM7600G-H | 4G LTE | USB |
| Huawei E220 | 3G/2G | USB |

### ZigBee Coordinators

| Device | Chip | Connection |
|--------|------|------------|
| SONOFF ZigBee 3.0 USB Dongle Plus | CC2652P | USB |

## Reference Kits

### Full Field Kit

All transports in a waterproof Pelican case:
- Raspberry Pi 5 (8 GB)
- Heltec LoRa V4 (915 MHz Meshtastic)
- RockBLOCK 9603 (Iridium SBD)
- LILYGO T-Call A7670 (4G LTE)
- INIU 25000mAh USB-C PD power bank

### Compact Kit

Pocket-sized, high-bandwidth satellite:
- BananaPi BPI-M4 Zero (4 GB + 32 GB eMMC)
- XIAO ESP32-S3 + SX1262 LoRa (868/915 MHz)
- RockBLOCK 9704 (Iridium IMT, 100 KB messages)
- Anker Prime 20000mAh (200W USB-C)

## USB Auto-Detection

MeshSat's DeviceSupervisor automatically detects USB devices via VID:PID tables and protocol probing. No manual port configuration is needed in most cases.

The identification cascade:
1. VID:PID lookup (FTDI, CP2102, CH340, etc.)
2. JSPR probe (RockBLOCK 9704)
3. AT command probe (Iridium 9603N, cellular)
4. Cellular modem probe
5. Astronode probe
6. ZNP probe (ZigBee)
