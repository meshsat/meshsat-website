# Reticulum

Reticulum is a cryptographic networking stack that does not assume the internet. It routes by
destination hash rather than address, every destination is a keypair, and it runs over anything
that can move bytes.

MeshSat implements the Reticulum wire format directly, in Go, wire compatible with the reference
Python implementation. A standard `rnsd` node treats a MeshSat bridge as a peer.

## Why it is here

The bridge already speaks LoRa, satellite, SMS, packet radio and TCP. Reticulum is the layer that
makes those one network instead of five: a destination announced over LoRa can be reached later
over Iridium, without anybody reconfiguring a route, because the identity is the address.

## Identity and addressing

An identity is two keys: X25519 for encryption and Ed25519 for signing, published as a 64 byte
public key with the encryption key first. A destination address is the SHA-256 of the name hash
and identity hash, truncated to 16 bytes.

| Constant | Value |
|---|---|
| MTU | 500 bytes |
| Maximum payload | 464 bytes |
| Destination hash | 16 bytes |
| Signature | 64 bytes, Ed25519 |
| Maximum hops | 128 |

The bridge's identity is persisted, so it survives a restart and peers keep their routes.
`GET /api/routing/identity` returns it.

## Interfaces

Reticulum runs over any of these, and over several at once:

| Interface | Configuration |
|---|---|
| TCP server | `MESHSAT_TCP_LISTEN=0.0.0.0:4242` |
| TCP client | `MESHSAT_TCP_CONNECT=host:4242` |
| AX.25 over a KISS TNC | `MESHSAT_AX25_KISS_ADDR`, `MESHSAT_AX25_CALLSIGN` |
| SMS | `MESHSAT_SMS_RETICULUM_PEER=+31600000000` |
| Bluetooth LE | `MESHSAT_BLE_ADAPTER=hci0`, `MESHSAT_BLE_DEVICE_NAME` |
| MQTT | `MESHSAT_MQTT_RETICULUM_BROKER`, `MESHSAT_MQTT_RETICULUM_TOPIC` |

Each is empty and therefore off by default. TCP uses HDLC framing, the same as the reference
implementation's `TCPServerInterface` and `TCPClientInterface`.

`MESHSAT_AX25_KISS_ADDR` takes either a Direwolf TCP KISS address such as `localhost:8001` or the
literal `gateway`. Use `gateway` with a serial TNC: the device has one file handle and the APRS
gateway already holds it, so Reticulum frames have to travel through that link rather than opening
a second one.

## Announces and the routing table

The bridge announces itself every `MESHSAT_ANNOUNCE_INTERVAL` seconds, 300 by default, and learns
routes from the announces it hears. `GET /api/routing/destinations` lists what it knows.

Routes are chosen by cost first and hop count second:

| Interface | Cost per message |
|---|---|
| mesh, ZigBee, APRS, AX.25, BLE, TCP, MQTT, webhook | 0 |
| cellular (SMS) | 0.005 |
| Iridium | 0.05 |

So a destination reachable over both LoRa and satellite is reached over LoRa, even if the satellite
path is one hop shorter. Cheaper wins; among equal costs, fewer hops wins; a route that is neither
cheaper nor shorter is ignored rather than flapping between two bearers.

Routes expire 30 minutes after the last announce that refreshed them. Announces are capped at 2%
of an interface's bandwidth so a busy routing table cannot crowd out traffic on a slow link.

## Links and resources

A link is an encrypted session between two destinations, established with an ephemeral key
exchange. `POST /api/links` opens one, `GET /api/links` lists them, `DELETE /api/links/{id}` closes
one.

Resources are the mechanism for transferring something larger than a packet: the sender advertises,
the receiver requests parts, and the transfer is resumable. `GET /api/resources`,
`POST /api/resources/offer` and `GET /api/resources/{hash}/data` are the endpoints, with
`GET /api/resources/stats` for progress.

## Connecting to the MeshSat Hub

The Hub runs a Reticulum node reachable at `reticulum.meshsat.net:443`. It is TLS with **mutual**
authentication: the connection is refused without a client certificate signed by the Hub's own
bridge certificate authority.

That certificate is issued per bridge from the Hub's Fleet page, and it arrives in the same
provisioning bundle as the MQTT credentials. See [connect a bridge](/hub/connect-a-bridge). RNS
speaks plain TCP rather than TLS, so a node connecting by hand needs a local TLS wrapper presenting
the certificate and offering a plain port for RNS to use.

## Peers

`GET /api/routing/peers` lists configured peers, with `POST` and `DELETE /api/routing/peers/{addr}`
to manage them. `GET /api/routing/config` and `PUT` cover the announce interval and related
settings, and `GET /api/routing/floodable` controls which interfaces may carry flooded traffic.
Flooding an expensive interface is exactly as costly as it sounds, which is why it is per interface
and off by default.

## Related

- [Failover](/guide/features/failover) for the bearer selection that sits underneath.
- [MQTT](/transports/mqtt) and [APRS](/transports/aprs) for the transports Reticulum can borrow.
- [Connect a bridge](/hub/connect-a-bridge) for the Hub certificate.
