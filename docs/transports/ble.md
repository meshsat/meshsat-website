# Bluetooth LE

<ChannelStatus code="code">The interface is in the Bridge. We have no record of it running on a kit.</ChannelStatus>

`ble_0` is a Reticulum interface over Bluetooth Low Energy, for short-range routing between a
Bridge and a nearby device. It uses the Raspberry Pi's built-in Bluetooth through BlueZ, with no
extra hardware.

This is not the [node's Bluetooth pipe](/transports/iridium-node). That one reaches a satellite
modem; this one carries Reticulum packets.

## How it works

- The Bridge is a GATT peripheral: it advertises a Reticulum service with one characteristic to
  write to and one that notifies.
- A Bluetooth LE frame holds about 244 bytes and a Reticulum packet up to 500, so the interface
  splits packets and puts them back together.
- It costs nothing to use, so the router treats it as a free interface.

It is off unless `MESHSAT_BLE_ADAPTER` names a Bluetooth adapter.

## What we plan to test, and how

The test plan is not written yet. The first proof it needs is simple to state: the interface
enabled on a kit, a second Reticulum device in Bluetooth range, and announces crossing the link
in both directions.

## Not tested yet

- Any run on a kit.
- Any range. The estimates for the Raspberry Pi's Bluetooth are on
  [Radios and range](/guide/radios-and-range).

## Related

- [Reticulum](/guide/features/reticulum)
