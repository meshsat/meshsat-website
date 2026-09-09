# API Keys

::: tip Where the token comes from
The examples below need a key that already exists. Create your first one in the Hub under
**API keys**; after that a key with the owner role can mint more. See [Hub API](/hub/api).
:::

API keys provide programmatic access to the Hub API.

## Create a key

```bash
curl -X POST https://hub.meshsat.net/api/auth/keys \
  -H "Authorization: Bearer <owner-token>" \
  -H "Content-Type: application/json" \
  -d '{"label": "CI pipeline", "role": "admin"}'
```

Response includes the key once — store it securely:

```json
{
  "id": "abc123",
  "label": "CI pipeline",
  "key": "meshsat_a1b2c3d4...",
  "role": "admin",
  "created_at": "2026-03-23T00:00:00Z"
}
```

## Use a key

```bash
curl https://hub.meshsat.net/api/devices \
  -H "Authorization: Bearer meshsat_a1b2c3d4..."
```

## List and delete

```bash
# List all keys (owner only)
curl https://hub.meshsat.net/api/auth/keys \
  -H "Authorization: Bearer <owner-token>"

# Delete a key
curl -X DELETE https://hub.meshsat.net/api/auth/keys/abc123 \
  -H "Authorization: Bearer <owner-token>"
```
