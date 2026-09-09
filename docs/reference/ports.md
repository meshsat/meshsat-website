# Ports

What listens where, and what has to be reachable from where.

The short version: **a bridge needs no inbound ports at all.** Everything it does with the Hub, with
satellite providers and with APRS-IS is outbound. The listeners below are for the local network and
for optional features.

## Bridge

| Port | Protocol | Purpose | Exposure |
|---|---|---|---|
| 6050 | TCP | web UI, REST API, `/metrics` | local network |
| 4242 | TCP | Reticulum, only if `MESHSAT_TCP_LISTEN` is set | off by default |
| 6969 | UDP | TAK situational awareness on `239.2.3.1` | local network multicast |

`MESHSAT_PORT` moves the API port. There is no separate metrics port: Prometheus scrapes
`http://bridge:6050/metrics`.

### Outbound

| Destination | Port | For |
|---|---|---|
| `mqtt-hub.meshsat.net` | 443 | Hub connection, MQTT over WebSocket with a client certificate |
| `reticulum.meshsat.net` | 443 | Hub Reticulum node, TLS with a client certificate |
| `euro.aprs2.net` or your chosen server | 14580 | APRS-IS |
| your TAK server | 8087 | CoT |
| `celestrak.org` | 443 | orbital elements for pass prediction |
| provider APIs | 443 | Cloudloop, Rock7, Twilio, Globalstar |

### Local only

| Port | For |
|---|---|
| 8001 | Direwolf KISS, on loopback |
| your choice | the llama-zip and MSVQ-SC gRPC sidecars, set with `MESHSAT_LLAMAZIP_ADDR` and `MESHSAT_MSVQSC_ADDR` |

Satellite modems, Meshtastic radios, cellular modems and ZigBee coordinators are serial devices,
not network services. They appear as `/dev/tty*` and are found automatically unless you pin them.

## Hub

Running your own Hub:

| Port | Protocol | Purpose |
|---|---|---|
| 6070 | TCP | HTTP API and dashboard |
| 6071 | TCP | MQTT for field devices |
| 6072 | TCP | MQTT over WebSocket |
| 4242 | TCP | Reticulum, HDLC framing |

Put a reverse proxy in front and terminate TLS there. Do not expose 6070 directly.

## The hosted Hub

Everything is on 443, so a network that allows outbound HTTPS allows all of it.

| Hostname | Port | Protocol |
|---|---|---|
| `hub.meshsat.net` | 443 | HTTPS, dashboard and API |
| `auth.meshsat.net` | 443 | HTTPS, sign in |
| `mqtt-hub.meshsat.net` | 443 | MQTT over WebSocket, client certificate required |
| `reticulum.meshsat.net` | 443 | Reticulum over TLS, client certificate required |

The two certificate-bearing endpoints are mutually authenticated: without a certificate issued by
the Hub the connection is refused before anything is sent. The certificate arrives in the
provisioning bundle, see [connect a bridge](/hub/connect-a-bridge).

## Firewall rules worth writing down

- **Outbound 443 only** is enough for a bridge that uses the hosted Hub and satellite providers.
- **Inbound nothing**, unless you deliberately enable the Reticulum TCP listener or want the web UI
  reachable from beyond the machine it runs on.
- **Multicast on the local segment** if you want TAK situational awareness to reach ATAK clients.
- APRS-IS is outbound on 14580 and refuses to work through most captive portals.

## Related

- [Environment variables](/reference/environment-variables)
- [Hub configuration](/reference/hub-configuration)
- [Connect a bridge](/hub/connect-a-bridge)
