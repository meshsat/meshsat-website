# Build a node

::: danger Prototype
MeshSat is a prototype in active development. Its dependability is unproven. Do not rely on it for life safety.
:::

There are two versions. v0 is the bench unit the first tests ran on. v1 is the one meant to become a product. **v1 has not been built yet:** its wiring below comes from LILYGO's schematic, and this page will change once it has run on hardware.

## v1: T-Beam Supreme

### Parts

| Part | Notes |
|---|---|
| LILYGO T-Beam Supreme, 868 MHz | ESP32-S3, SX1262 LoRa, u-blox M10S GPS, AXP2101 power chip and a holder for one 18650 cell |
| RockBLOCK 9603 | with its 10-pin cable |
| One 18650 Li-ion cell | we use a Samsung INR18650-35E |
| Peli 1020 case | 135 x 90 x 43 mm inside. By the dimensions, the T-Beam (100 x 33 x 28 mm) and the RockBLOCK (45 x 45 x 16 mm) fit side by side; not dry-fitted yet. The Peli 1050 is the roomier fallback |
| IP68 panel-mount USB-C | charging and flashing through the case wall. It must carry the data lines, not only power |
| 12 mm momentary panel button | wired across the T-Beam's own power button |
| Waterproof SMA bulkhead cable and an 868 MHz antenna | the LoRa antenna sits outside the case |
| 90 degree USB-C adapter | about 21 mm is left at the T-Beam's USB-C end, too little for a straight plug |

### Wiring

Four wires between the T-Beam's header PM1 and the RockBLOCK's connector:

| T-Beam PM1 | RockBLOCK |
|---|---|
| pin 13, U0TXD (GPIO43) | pin 6, TXD (the modem's input) |
| pin 12, U0RXD (GPIO44) | pin 1, RXD (the modem's output) |
| pin 9, DCDC5 | pin 8, power in |
| pin 8, GND | pin 10, GND |

- **Leave RockBLOCK pins 7 (OnOff) and 9 (Li-Ion) unconnected.** A floating OnOff means on.
- **The panel button goes across the T-Beam's power button** (SW3 on the schematic, PWR_KEY to GND). A short press turns the node on, a long press turns it off, and the RockBLOCK goes off with it.
- **Screw the LoRa antenna on before the first power-up.** The firmware transmits within seconds of booting, and LILYGO warns that transmitting without an antenna can damage the radio.
- **The RockBLOCK's antenna side faces the lid**, towards the sky.

### Power

The RockBLOCK runs from the T-Beam's DCDC5 rail at 3.7 V. The firmware switches it on at boot and keeps it on while the node runs, so incoming messages are not delayed. The rail is a step-down from the cell, so once the cell falls below about 3.8 V the modem's supply follows it. The RockBLOCK needs 3.0 V or more.

The Meshtastic firmware the T-Beam ships with keeps DCDC5 off. With that firmware the RockBLOCK stays dark, which is expected. It powers up once the MeshSat firmware is on.

## v0: XIAO ESP32-S3

| Part | Notes |
|---|---|
| Seeed Studio XIAO ESP32-S3 | the ESP32-S3 kit with the Wio-SX1262 on its B2B connector, 868 MHz |
| RockBLOCK 9603 | with its 10-pin cable |
| A 5 V source rated for at least 500 mA | for the RockBLOCK. A USB-C power bank works |

| XIAO ESP32-S3 | RockBLOCK |
|---|---|
| D6 (GPIO43) | pin 6, TXD (the modem's input) |
| D7 (GPIO44) | pin 1, RXD (the modem's output) |
| | pin 8, power in: the 5 V source |
| GND | pin 10, GND, shared with the 5 V source |

::: warning Use the XIAO's own pads
The Wio-SX1262 board also has pads labelled D5, D6 and D7, but on the ESP32-S3 kit they are not connected to anything. Wires on those pads leave the modem silent.
:::

A power bank's USB-A port can switch itself off because the XIAO draws so little; use its USB-C port. Never feed 5 V into the XIAO's 5V pin while the XIAO is plugged into a computer: that pin is the USB supply line with no diode. Full wiring, power notes and a bench console for testing the modem link: [BENCH.md](https://github.com/meshsat/meshsat-esp32/blob/main/docs/BENCH.md).

## Firmware

Build [meshsat-firmware](https://github.com/meshsat/meshsat-firmware) with PlatformIO Core **6.1.19**. Version 6.2.0 stops with `ModuleNotFoundError: SCons.Tool.FortranCommon`.

```sh
pip install "platformio==6.1.19"
git clone https://github.com/meshsat/meshsat-firmware.git
cd meshsat-firmware
pio run -e meshsat-tbeam-s3-rockblock     # v1; use meshsat-xiao-s3-rockblock for v0
```

Flash it over USB with esptool. Erase first on a board that ran something else:

```sh
esptool --chip esp32s3 --port /dev/ttyACM0 erase-flash
esptool --chip esp32s3 --port /dev/ttyACM0 write-flash \
  0x0      .pio/build/meshsat-tbeam-s3-rockblock/firmware-meshsat-tbeam-s3-rockblock-*.factory.bin \
  0x670000 .pio/build/meshsat-tbeam-s3-rockblock/littlefs-meshsat-tbeam-s3-rockblock-*.bin
```

Then set it up like any Meshtastic node, with the Meshtastic app or CLI: your region, an owner name, and Bluetooth pairing set to a fixed PIN of your own. Updates go over USB the same way; over-the-air updates are not supported.

## Pair with MeshSat Android

In MeshSat Android 2.9.10 or later, open Settings, tap **Scan for Meshtastic devices**, and tap **Connect** next to your node. The scan lists every Meshtastic device in range, so pick the node by its name: v0 advertises as `MSIR_` followed by four hex digits. Pair with your fixed PIN when the phone asks.

With **Use the node's modem** on (the default), the app takes the modem while it is connected. After a restart it reconnects to the same node and takes the modem back by itself. **Disconnect** in Settings stops that until you connect again. On v1 the modem answers about 10 seconds after power-up, and the app keeps asking until it does.
