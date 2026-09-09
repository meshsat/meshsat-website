# Meshtastic

LoRa mesh radios over USB serial. This is the transport most MeshSat deployments start with: a
handful of cheap radios giving a group local coverage with no infrastructure at all.

## What it is for

A Meshtastic mesh keeps a group talking to each other over a few kilometres of terrain with no
network and nothing to pay per message. What it cannot do is leave the valley. MeshSat takes a message off
the mesh and forwards it by whatever else is reachable, which is the whole reason the router
exists.

## Hardware

Any Meshtastic-compatible board that presents a USB serial port: T-Echo, Heltec, RAK and the
rest. The bridge detects them on plug-in and does not need to be told which port.

Two USB-to-serial chips are ambiguous. CP210x (`10c4:ea60`) and CH343 (`1a86:55d4`) are used by
both Meshtastic boards and ZigBee coordinators, so the bridge probes the protocol to tell them
apart rather than trusting the USB identifiers.

## How it connects

The bridge speaks the Meshtastic protobuf protocol directly over the serial link. It does not go
through the Meshtastic phone app and does not need one.

Messages arriving from the mesh enter the router like any other inbound message and are matched
against your routing rules. Messages sent to the mesh are encoded and written back out the same
port.

## Compression

Mesh packets are small, so text is compressed with SMAZ2 before it goes anywhere expensive. The
dictionary is the Meshtastic vocabulary and is byte identical across the Bridge, the Hub and the
Android app, because a mismatch would make a message undecodable at the other end.
