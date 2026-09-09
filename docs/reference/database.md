# Database

The Bridge and the Hub each keep their own database. They are different engines for different
jobs, and nothing is shared between them: what the Hub knows about a bridge arrived over MQTT, not
out of a shared table.

## Bridge

One SQLite file, by default `/cubeos/data/meshsat.db`, overridable with `MESHSAT_DB_PATH`.

The driver is `modernc.org/sqlite`, a pure Go implementation, so the binary builds with
`CGO_ENABLED=0` and cross compiles to every board MeshSat supports. The connection opens with:

| Pragma | Value | Why |
|---|---|---|
| `journal_mode` | WAL | readers do not block the writer |
| `busy_timeout` | 5000 ms | a slow SD card is a wait, not an error |
| `synchronous` | NORMAL | survives a process crash; a power cut can lose the last commit |

`synchronous(NORMAL)` is the deliberate trade for flash endurance on a Raspberry Pi. If your
deployment can lose power without warning and cannot lose the last few seconds of messages, put
the database on storage that will not, rather than changing the pragma.

### What is in it

Around 70 tables. The groups worth knowing:

| Group | Tables |
|---|---|
| Traffic | `messages`, `positions`, `telemetry`, `message_deliveries`, `dead_letters` |
| Routing | `interfaces`, `access_rules`, `object_groups`, `failover_groups`, `failover_members`, `bond_groups`, `bond_members`, `routing_destinations`, `routing_links` |
| Satellite | `iridium_tle_cache`, `iridium_locations`, `pass_quality_log`, `credit_balance`, `credit_usage`, `satellite_usage`, `satellite_rate_limits` |
| Contacts and keys | `contacts`, `contact_addresses`, `directory_contacts`, `directory_contact_keys`, `key_bundles`, `sms_contacts` |
| Devices | `devices`, `device_config_versions`, `sim_cards`, `zigbee_devices`, `neighbor_info` |
| Evidence | `audit_log`, `signal_history`, `spectrum_scans`, `webhook_log`, `oob_log` |

### Migrations

`internal/database/migrations.go` holds an append-only list, 54 entries at the time of writing.
The current version lives in the `schema_version` table and the bridge applies everything above it
at startup.

Append-only is a rule, not a convention: editing an existing migration changes what a fresh
install builds while leaving every existing install alone, and the two silently diverge. Add a new
entry instead.

### Retention

A worker runs daily and deletes rows older than `MESHSAT_RETENTION_DAYS`, 30 by default, from
`messages`, `telemetry` and `positions`, plus dead letters that have been sent or have expired.
Set it to `0` to keep everything, and then watch the disk.

Nothing else is pruned. Audit entries, configuration, contacts and keys are kept until you remove
them.

### Backing it up

Copy the file while the bridge is stopped, or use `sqlite3 meshsat.db ".backup out.db"` while it is
running. The WAL means a plain `cp` of a live database can be a torn read.

`GET /api/config/export` is the other half: it returns the running configuration in a readable
form, which is what you actually need to rebuild a bridge. The database carries history; the export
carries intent.

## Hub

The hosted Hub runs PostgreSQL, managed by CloudNativePG: three instances with a synchronous
replica, so a committed write exists on two machines before the Hub is told it succeeded.

A self-hosted standalone Hub uses SQLite instead, at `/data/hub.db`, set with `HUB_SQLITE_PATH`.
Both implementations pass the same conformance suite, so the Hub behaves identically on either.

### Migrations

Numbered, append-only, and **checksum verified**: the recorded hash of every applied migration is
compared against the text in the binary at startup, and a mismatch refuses to start rather than
running against a schema nobody can reason about. Migrations run under a Postgres advisory lock, so
several replicas starting at once queue rather than race.

### Your data, in the hosted Hub

| Endpoint | What it does |
|---|---|
| `GET /api/tenant/export` | a ZIP with one JSON file per table |
| `DELETE /api/tenant` | marks the account for deletion |

Deletion is soft for 30 days, then a purge job removes the rows for good. The list of tables to
export and erase is read from the database catalogue rather than written out in code, because a
hardcoded list is one forgotten migration away from an erasure that leaves rows behind.

Columns holding secrets are withheld from exports. Your API keys and provider credentials are not
in the ZIP, by design.

See [your data](/hub/your-data) for the tenant-facing version of this.

## Related

- [Environment variables](/reference/environment-variables)
- [Hub configuration](/reference/hub-configuration)
- [Your data](/hub/your-data)
