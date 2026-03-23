# Authentication

MeshSat Hub supports four authentication modes, configured via `HUB_AUTH_MODE`.

## Modes

### none
No authentication. All requests are allowed. **Development only.**

### token
Simple bearer token. Set `HUB_AUTH_TOKEN` and pass it as `Authorization: Bearer <token>`. All authenticated users get the same role.

### local
Built-in user accounts with email + password login.
- Passwords hashed with Argon2id
- JWT sessions with HMAC-SHA256 signing (`HUB_JWT_SIGNING_KEY`, min 32 chars)
- Refresh token rotation
- Failed login tracking

### oidc
External OAuth2/OIDC provider (Keycloak, Auth0, Authentik, etc.).
- JWKS verification of incoming JWTs
- Optional TLS certificate pinning (`HUB_OIDC_CERT_PIN`)
- Tenant ID extracted from JWT `tenant_id` claim

## API Keys

API keys provide programmatic access without user sessions.

- Format: `Authorization: Bearer meshsat_...`
- Stored as SHA256 hashes (key itself is shown once at creation)
- Per-key RBAC role assignment
- Optional expiry date
- Last-used tracking

## RBAC Roles

| Role | Permissions |
|------|------------|
| `viewer` | Read devices, messages, positions |
| `admin` | Create/update devices, messages, webhooks, escalation chains |
| `owner` | Full access + user management + API key management + audit log |

## Multi-tenancy

When `HUB_TENANT_ENFORCE=true`, all API requests require a tenant context (from JWT claim or `X-Tenant-ID` header). Each tenant sees only their own data.
