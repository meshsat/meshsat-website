# MeshSat Hub

MeshSat Hub is the multi-tenant SaaS platform for managing fleets of MeshSat Bridge instances. It provides centralized authentication, tenant isolation, API key management, and aggregated monitoring across all gateways in an organization.

## Overview

While MeshSat Bridge is a standalone gateway that runs independently on a single device, Hub connects multiple Bridge instances into a managed fleet. Organizations can monitor all their gateways from a single dashboard, define routing policies centrally, and manage user access with fine-grained permissions.

## Key Features

### Multi-Tenant Architecture

Hub isolates each organization (tenant) completely. Tenants share the platform infrastructure but cannot access each other's data, gateways, or configuration. Each tenant gets:

- Isolated message storage (per-tenant SQLite databases)
- Separate API keys and user accounts
- Independent routing policies and transport configuration
- Dedicated NATS subjects for real-time messaging

### Authentication

Hub supports multiple authentication methods:

- **OAuth2/OIDC** — Single sign-on with identity providers (Keycloak, Auth0, Google, etc.)
- **API Keys** — Service-to-service authentication for Bridge-to-Hub communication
- **Session tokens** — Browser-based dashboard access

See [Authentication](/hub/authentication) for setup and configuration.

### Gateway Management

Hub maintains a registry of all connected Bridge instances. Each gateway reports:

- Connection status and uptime
- Transport health (which radios/modems are connected)
- Message throughput and error rates
- System metrics (CPU, memory, disk)

### Centralized Policies

Routing policies can be defined at the Hub level and pushed to all gateways in a tenant. This allows organizations to enforce consistent routing rules across their entire fleet without configuring each gateway individually.

### API Keys

Hub issues scoped API keys for programmatic access. Keys can be restricted by:

- Tenant (which organization's data they can access)
- Permissions (read, write, admin)
- Expiration (time-limited or permanent)
- IP allowlist (restrict to specific source IPs)

See [API Keys](/hub/api-keys) for management and best practices.

## Architecture

```
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
  │  Bridge #1   │    │  Bridge #2   │    │  Bridge #3   │
  │  (Field)     │    │  (Field)     │    │  (Field)     │
  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                    ┌────────▼────────┐
                    │   MeshSat Hub   │
                    │                 │
                    │  ┌───────────┐  │
                    │  │  NATS Bus │  │
                    │  └───────────┘  │
                    │  ┌───────────┐  │
                    │  │  MariaDB  │  │
                    │  │  Galera   │  │
                    │  └───────────┘  │
                    │  ┌───────────┐  │
                    │  │  OAuth2   │  │
                    │  │  /OIDC    │  │
                    │  └───────────┘  │
                    └─────────────────┘
```

## Deployment

Hub is designed for server or cloud deployment. It requires:

- MariaDB Galera cluster (or single MariaDB instance for small deployments)
- NATS server for real-time messaging
- OAuth2/OIDC identity provider
- Reverse proxy (Nginx, Caddy, etc.) for TLS termination

See [Tenants](/hub/tenants) for multi-tenant setup and configuration.

## Next Steps

- [Authentication](/hub/authentication) — Configure SSO and API authentication
- [Tenants](/hub/tenants) — Set up and manage tenants
- [API Keys](/hub/api-keys) — Create and manage API keys
