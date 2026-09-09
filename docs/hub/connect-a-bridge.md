# Connect a bridge

A bridge reaches the Hub over MQTT on a WebSocket, and the Hub authenticates it with a client
certificate rather than a password. The certificate is the identity: it is signed by the Hub's
own bridge CA, and a bridge without one cannot connect no matter what else it presents.

You do this once per bridge. It takes about two minutes.

## In the Hub

1. Open **Fleet** and choose **Add bridge**. Give it an ID that means something to you; it is the
   name you will see on the map and in the message log.
2. **Generate credentials.** The Hub creates the MQTT user for this bridge.
3. **Issue a certificate.** You get the certificate, its private key and the CA certificate.
   **The private key is shown once and never again.** Copy all three now.

The Fleet page walks these three steps in order the first time you add a bridge.

## On the bridge

Put the values into the bridge's Hub Connection settings, or into its environment:

| Setting | What goes in it |
|---|---|
| `MESHSAT_HUB_URL` | `wss://mqtt-hub.meshsat.net/mqtt` |
| `MESHSAT_BRIDGE_ID` | the bridge ID you chose, defaults to the hostname |
| `MESHSAT_HUB_USERNAME` | the username from the Hub, `meshsat` by default |
| `MESHSAT_HUB_PASSWORD` | the password from the Hub |
| `MESHSAT_HUB_TLS_CERT` | path to the client certificate |
| `MESHSAT_HUB_TLS_KEY` | path to the private key |
| `MESHSAT_HUB_TLS_CA` | path to the CA certificate |

Restart the bridge. It publishes a birth message on connect, and the Fleet page turns it online
within a few seconds.

::: warning Do not set the bridge CA as the system trust store
The CA certificate above verifies the bridge to the Hub. It is not for verifying the Hub to the
bridge: that is a normal public certificate and the system roots already handle it. Replacing the
system roots with the bridge CA stops the bridge trusting the server it is talking to.
:::

## Certificates expire

Certificates are issued for 90 days. Reissue from the Fleet page before expiry and replace the
files on the bridge; nothing else changes. A bridge whose certificate has expired stops
connecting and shows offline.

## If it stays offline

- The Hub marks a bridge offline when it has not been heard from for five minutes, so wait that
  long before assuming a problem.
- Check the bridge can reach `mqtt-hub.meshsat.net` on port 443. It is a normal outbound HTTPS
  connection; no inbound ports need opening.
- A certificate signed by a different Hub, or one that has expired, is refused at the broker
  before MQTT starts. That looks like a TLS error in the bridge log, not an authentication error.

## When the internet is not there

A bridge that cannot reach the Hub over the network can fall back to a satellite or SMS bearer
for the messages that matter, rather than going silent. This is on by default:

| Setting | Default | What it does |
|---|---|---|
| `MESHSAT_HUB_SAT_FALLBACK` | `true` | allow falling back to a satellite bearer |
| `MESHSAT_HUB_FALLBACK_AFTER_MIN` | `5` | minutes offline before falling back |
| `MESHSAT_HUB_FALLBACK_BEARER` | `auto` | which bearer to use |
| `MESHSAT_HUB_FALLBACK_POSITION_MIN` | `15` | minutes between positions while on fallback |
| `MESHSAT_HUB_FALLBACK_HEALTH_MIN` | `60` | minutes between health reports while on fallback |
| `MESHSAT_HUB_SMS_NUMBER` | unset | number to use if the fallback bearer is SMS |

Fallback traffic costs airtime on your own provider account, which is why the position and health
intervals are much longer than they are over the network.
