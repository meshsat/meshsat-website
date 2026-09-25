# Reticulum

Reticulum is a cryptographic networking stack that does not assume the internet. It routes by
destination hash rather than address, every destination is a keypair, and it runs over anything
that can move bytes.

MeshSat implements Reticulum directly, in Go: a transport node and an LXMF endpoint, wire compatible
with the reference Python implementation. A standard `rnsd` node treats a MeshSat bridge as a peer,
and an LXMF client such as Sideband or CrossTalk can message it.

## Verified against upstream

Every claim below is a test that runs in the bridge's own suite against the upstream Python packages,
pinned to **RNS 1.5.4** and **LXMF 1.1.0**, with the bridge in-process on one side and `rnsnode.py`
or a stock `rnsd` on the other.

| Exchange | Direction | Through a stock `rnsd` as transport |
|---|---|---|
| Announces, with the timestamp rule transport nodes apply | both | yes |
| Path requests for a known and an unknown destination | both | yes |
| Packets with proofs and receipts | both | yes |
| Links: request, proof, RTT, keepalive, teardown, identify | both | yes |
| Resources over a link (LXMF messages above 319 bytes) | both | yes |
| LXMF single-packet delivery, with the delivery proof | both | yes |
| LXMF stamps at cost 6 | both | |
| Three nodes: A and B that never connect, the bridge between them | | |
| RNode, UDP, AutoInterface and KISS interfaces | both | `rnsd` on the other end |

Not yet exercised: a Sideband or CrossTalk client on real hardware against a kit, and any of the
interfaces on a physical radio or TNC. The bridge's own Meshtastic and satellite bearers carry
Reticulum too, with the mesh limited by its 230-byte frames.

## Works with

The reference stack: `rnsd`, NomadNet, Sideband, Columba, RatSpeak, and CrossTalk, over TCP, an IP
mesh, an RNode or a TNC. Hardware the interfaces were written for: RNode boards (LilyGO LoRa32 and
T-Beam, Heltec V3 and V4, RAK4631, XIAO ESP32-S3 with a Wio-SX1262, T-Echo, T-Deck, Parallel's
prebuilt nodes), Haven 1 and 2 and any OpenMANET, MOROSX or HaLowLink mesh, a RockBLOCK 9704 running
CrossTalk's Iridium interface (see below), and Rhizomatica's Mercury HF modem over KISS.

## A client's side

An `rnsd` or Sideband configuration that reaches a kit over its TCP interface:

```ini
[interfaces]
  [[MeshSat kit]]
    type = TCPClientInterface
    enabled = yes
    target_host = 192.168.1.20
    target_port = 4242
```

On the same Ethernet segment nothing is needed beyond the client's default AutoInterface.

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
| [RNode](/transports/rnode) | Settings > Routing, or `MESHSAT_RNODE_PORT` |
| [UDP and AutoInterface](/transports/ip-mesh) | Settings > Routing, or `MESHSAT_UDP_*`, `MESHSAT_AUTO_IFACE_*` |
| [KISS TNC](/transports/kiss) | Settings > Routing, or `MESHSAT_KISS_PORT` |

The last three are managed at runtime from Settings > Routing > Reticulum Interfaces: add, edit,
restart and remove without a restart, with the radio's RSSI, SNR and airtime on the card.

### Iridium IMT and CrossTalk

CrossTalk's Iridium interface wraps every Reticulum packet on a RockBLOCK 9704 in a five-byte
`RNSI` header. The kit's IMT interface sends bare packets by default; the checkbox under
Settings > Routing turns the header on when the far side runs CrossTalk, and receive recognises
either form. Two kits, or a kit and a CrossTalk node on the same Cloudloop account, exchange packets
through the Hub's satellite relay, which forwards the bytes untouched on the topic they arrived on.

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

## Time sync between bridges

Bridges compare clocks over the free interfaces with a 26-byte request (Reticulum packet type 0x14)
and a reply (0x15); paid bearers never carry either. On a KISS modem the request shows up as a
42-byte AX.25 UI frame. Where another bridge answered in the last ten minutes, a bridge asks every
30 seconds; where none did, it sends one discovery request every `MESHSAT_TIMESYNC_DISCOVERY_MIN`
minutes, 10 by default, so a bridge on its own stays quiet. On a slow link the period is stretched
to keep the request within 2% of the link's airtime: set `MESHSAT_AX25_BITRATE` to the modem's bit
rate (1200 by default), and a 149 bit/s HF mode then asks about every two minutes.
`GET /api/timesync/peers` and Settings > Routing show the other bridges with their stratum, clock
offset and round trip, and the request schedule of each interface.

## LXMF

The bridge is an LXMF endpoint (`lxmf.delivery`, announced with its display name). Inbound
messages land in the inbox like any other bearer's, and `POST /api/lxmf/send` queues a message to a
destination hash through the delivery ledger, where it retries and reports like an SMS or a
satellite send. `GET /api/lxmf/identity` and `GET /api/lxmf/peers` show the endpoint and the LXMF
peers heard. Stamps are honoured when a peer asks for them and never demanded by default.

## Links and resources

A link is an encrypted session between two destinations, established with an ephemeral key
exchange. `GET /api/rns/links` lists them, `POST /api/rns/links` opens one, and
`DELETE /api/rns/links/{id}` closes one; `GET /api/rns/paths` is the path table.

Resources are the mechanism for transferring something larger than a packet: the sender advertises,
the receiver requests parts, and the transfer is resumable. `GET /api/resources`,
`POST /api/resources/offer` and `GET /api/resources/{hash}/data` are the endpoints, with
`GET /api/resources/stats` for progress.

## Connecting to the MeshSat Hub

The Hub runs a Reticulum node reachable at `reticulum.meshsat.net:443`. It is TLS with **mutual**
authentication: the connection is refused without a client certificate signed by the Hub's own
bridge certificate authority.

That certificate is issued per bridge from its page under Kits in the Hub, and it arrives in the same
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
