---
description: "Prepare a Linux host and radios for MeshSat Bridge, choose an installation method, and plan your first reception test."
---

# Getting started with Bridge

Bridge runs the gateway and its dashboard on your Linux computer. It works without a Hub
account. A kit is a Bridge installed in a case with its radios. For phone apps or fleet
management, [choose your setup](/start). For the concepts, read the [introduction](/guide/).

## Prepare the hardware

Use a 64-bit ARM64 or x86_64 Linux host with a reliable power supply, free disk space and a
network connection for the first installation. A Raspberry Pi 4 or 5 is a starting point;
see the [hardware guide](/guide/hardware) for the tested combinations.

Connect one Meshtastic radio by a data-capable USB cable. A second radio, configured for the
same region and channel, lets you confirm that a transmitted message actually arrived.
A successful API response alone does not prove radio reception.

You do not need a satellite modem for this first test. Satellite and SMS require their own
hardware and carrier accounts; adding them can incur airtime charges.

## Choose an installation method

- **First installation:** follow the [quick start](/guide/quick-start) from installation through a received message.
- **Existing Docker setup or air-gapped host:** use the [installation guide](/guide/installation).
- **Existing Bridge:** keep a backup of your Compose configuration and data before an update. The installer preserves your Compose file by default.

The dashboard listens on port 6050. Use a trusted local network and review
[security](/guide/features/security) before making it reachable from elsewhere.

## After the first message

Add one transport at a time. Configure [access rules](/guide/features/access-rules), send an
incoming message and confirm reception at the intended destination. Each transport's
[status page](/transports/) states what has been demonstrated and what remains untested.

All MeshSat products are prototypes. A successful bench test is not evidence of emergency
reliability. [Troubleshooting](/guide/troubleshooting) covers connection and delivery failures.
