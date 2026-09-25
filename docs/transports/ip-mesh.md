# IP mesh: UDP and AutoInterface

Any IP network carries Reticulum, and the bridge speaks the two interface types the reference
implementation uses for a LAN or a mesh: `UDPInterface` and `AutoInterface`. That covers a plain
Ethernet segment, a Wi-Fi HaLow mesh such as a Haven node, MOROSX or HaLowLink radios running
OpenMANET with batman-adv, or anything else that hands the bridge a network device.

## AutoInterface

Zero configuration: nodes find each other with IPv6 link-local multicast on the chosen devices and
exchange packets over UDP. It is what `rnsd`, Sideband and CrossTalk do by default, so a bridge on the
same segment joins with nothing configured on either side. The bridge follows the reference
implementation to the byte: discovery on port 29716 (unicast peering on 29717), data on 42671, the
group address and the discovery token derived from the group id, peers expire after 22 s.

| Field | Default | Notes |
|---|---|---|
| Group id | `reticulum` | Peers must use the same one |
| Devices | `eth0` | Comma separated. `wlan0` is refused: on a kit it is the only management path |

The device only needs to be up with a link-local address; no IPv4 lease is required.

## UDP

One raw Reticulum packet per datagram, broadcast to a forward address and received on a bind
address. This is how a Haven or OpenMANET node runs `rnsd` on the mesh itself:

| Field | Haven / OpenMANET value |
|---|---|
| Listen | `0.0.0.0:4242` |
| Forward | `10.41.255.255:4242` |

Or name the device and the bridge derives both from its IPv4 broadcast address.

## Configuration

Settings > Routing > Reticulum Interfaces > Add, type AutoInterface or UDP. Environment seeds for a
fresh database:

```
MESHSAT_AUTO_IFACE_DEVICES=eth0
MESHSAT_AUTO_IFACE_GROUP=reticulum
MESHSAT_UDP_LISTEN=0.0.0.0:4242
MESHSAT_UDP_FORWARD=10.41.255.255:4242
```

On a field kit, plugging the mesh radio's Ethernet into the Pi and adding an AutoInterface on `eth0`
is the whole job; the Wi-Fi stays untouched.

## A peer's side

An `rnsd` config that talks to the bridge over the same segment needs nothing beyond its own
AutoInterface:

```ini
[interfaces]
  [[Default Interface]]
    type = AutoInterface
    enabled = yes
```

## Verified

Both types pass announces, packets with proofs and receipts in both directions against a stock
`rnsd` 1.5.4: UDP over loopback, AutoInterface over a virtual Ethernet pair. A real HaLow segment has
not been on the bench yet.
