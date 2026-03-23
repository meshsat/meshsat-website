# Multi-Tenancy

MeshSat Hub supports multi-tenant deployments where multiple organizations share a single Hub instance with strict data isolation.

## How it works

Each API request carries a tenant context, extracted from:
1. JWT `tenant_id` claim (OIDC mode)
2. `X-Tenant-ID` header
3. Falls back to `"default"` if not provided

When `HUB_TENANT_ENFORCE=true`, requests without a tenant context are rejected.

## Data isolation

Each tenant has isolated:
- Device registry
- Messages and positions
- Webhook configurations
- Escalation chains
- API keys
- Rate limit counters
- Audit log entries

Tenants cannot access each other's data through any API endpoint.

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `HUB_TENANT_ENFORCE` | `false` | Require tenant context on all requests |
