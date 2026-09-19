# Self-hosting the Hub

MeshSat Hub is Apache 2.0. The hosted service at hub.meshsat.net is one deployment of it; you
can run your own, on one server or on Kubernetes, and nothing in the software phones home or
needs an account with us.

This page is the operator's path. If you only want to use the Hub, [create an account](/hub/accounts)
instead.

## What you get

| Aspect | Hosted (hub.meshsat.net) | Your own |
|---|---|---|
| Device ceiling | by plan: Free 4, Crew 24, Fleet 100 | yours: `HUB_PLAN_FREE_DEVICES` and friends, `-1` for no ceiling |
| Sign-in | MeshSat ID (OIDC) | a bearer token, local accounts, or your own OIDC provider |
| Satellite and SMS airtime | your own Cloudloop, Rock7 and Twilio accounts either way | same |
| Backups, upgrades, on-call | ours | yours |

A registered device keeps working whatever the plan, and an SOS is never gated by anything on
this page. That invariant is in the code, not in the hosting.

## What running it takes

The honest list, and the reason the hosted service exists. None of it is hard on its own; all of
it has to keep happening.

1. **A server that never sleeps,** with a public address, a domain name, a firewall and TLS
   certificates that renew every 90 days. When a certificate lapses, bridges and providers stop
   connecting.
2. **An address the satellite provider can reach at any hour.** Messages from the field land
   there. While the server is down, a message from the field has nowhere to land.
3. **Provider wiring:** the Cloudloop or Rock7 webhook, a Twilio number and its inbound webhook,
   and an email sender for notifications, each with secrets to keep safe.
4. **Sign-in:** a token, local accounts or your own identity provider. Two-factor sign-in is
   yours to set up.
5. **A certificate authority for the bridges.** The Hub issues each bridge its own client
   certificate; the key that signs them has to be kept safe and backed up.
6. **Backups, and a restore you have actually tried.**
7. **Upgrades:** new Hub versions and their migrations, the operating system, Docker and the
   broker, and a fix each time a vulnerability is published in something the stack uses.
8. **Monitoring, and a person who is woken up when it breaks.** An SOS system nobody watches is
   not a safety system.
9. **No single point of failure,** if you want it: several replicas, a replicated database and a
   broker cluster. That is the Kubernetes shape, and it is a real operations job.

On hub.meshsat.net all of that is done for you: two Hub replicas, PostgreSQL as three instances
with continuous archiving and a daily backup, signed and scanned images, and a nightly end-to-end
check against the live service. It is the same code, so a team can start there and move to its
own server later.

## Pick a shape

| Shape | Database | Broker | When |
|---|---|---|---|
| **One server** | SQLite (a file) | Mosquitto | a team, a region, an exercise |
| **Kubernetes** | PostgreSQL | NATS (MQTT + WebSocket, mutual TLS) | several replicas, more than one site |

There is no supported in-between any more. The two-host MariaDB Galera cluster that used to sit
between them was retired in September 2026; the Kubernetes tree is what replaced it.

## One server

You need a Linux host with Docker Engine 24 or newer and Compose v2, a public address, a
hostname that resolves to it, and ports 80 and 443 free. One vCPU and 512 MB of memory is
enough for a fleet of dozens.

```bash
git clone https://github.com/meshsat/meshsat-hub.git
cd meshsat-hub
cp .env.standalone.example .env
```

Edit `.env`. Three values matter on day one:

| Variable | What to put |
|---|---|
| `HUB_AUTH_TOKEN` | a long random string; it is the API and web sign-in token until you set up accounts |
| `CADDY_DOMAIN` | the hostname you pointed at this host |
| `CADDY_EMAIL` | where Let's Encrypt sends certificate notices |

Then put the same hostname in `Caddyfile` in place of `hub.example.com`, and start:

```bash
docker compose -f docker-compose.prod.yml up -d
curl https://your-hostname/healthz
```

The stack is Caddy (TLS from Let's Encrypt), the Hub, Mosquitto for the bridges, and a Tor
hidden service so a bridge with no fixed route can still reach you. The Hub's data is the
`hub-data` volume: one SQLite file. Back it up by copying that file while the Hub is stopped, or
with `sqlite3 .backup` while it runs.

To upgrade, pull the image and recreate the Hub service only:

```bash
docker compose -f docker-compose.prod.yml pull hub
docker compose -f docker-compose.prod.yml up -d --no-deps hub
```

Migrations run at start and are append-only; a newer Hub opens an older database.

### Accounts instead of one token

`HUB_AUTH_TOKEN` is fine for one operator. For a team, either set `HUB_JWT_SIGNING_KEY` (32
characters or more) to turn on local accounts with email and password, or set
`HUB_OIDC_ISSUER_URL` and its client id and secret to sign in through an OpenID Connect provider
you already run. The [authentication page](/hub/authentication) covers the modes and their
order of precedence.

Set `HUB_PUBLIC_URL` to the address your users type: it is what goes into the emails the Hub
sends and into the bridge provisioning bundle.

## Kubernetes

The repository's `k8s/` directory is a kustomize tree, the same one the hosted service runs
from. It expects a PostgreSQL database (the tree carries a CloudNativePG cluster), NATS for the
bus, and a secret store that can fill the `hub-secrets` Secret; the hosted service uses External
Secrets and OpenBao, but any Secret with the same keys works.

```bash
kubectl kustomize k8s/ | kubeconform -strict -ignore-missing-schemas
```

Read `k8s/CONVENTIONS.md` first. Two things in it are not optional: bridges reach NATS over
mutual TLS, so the Hub needs the bridge CA it issues certificates from, and the Hub's MQTT
client id must carry the pod name or two replicas evict each other from the broker.

Backups on Kubernetes are the database's: CloudNativePG streams WAL and takes a daily base
backup to an S3 bucket, and `docs/restore-drill.md` in the repository is the restore procedure
we run ourselves.

## Configuration

Every setting is an environment variable with the `HUB_` prefix, or the same key in
`config.yaml`. The [configuration reference](/reference/hub-configuration) lists them.
Anything a tenant owns (provider accounts, notification targets, TAK servers, the offline
timeout) is set in the web UI, not in the environment, so the same binary serves one tenant or
many.

## Where the hosted service keeps its notes

The repository's `docs/deployment.md` is written for the hosted deployment and names its
cluster, its object store and its identity provider. Read it for the shape of a production
installation; substitute your own names.
