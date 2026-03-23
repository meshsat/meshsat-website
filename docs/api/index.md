# API Reference

MeshSat Bridge exposes a REST API on port 6050 (configurable via `MESHSAT_PORT`).

## Base URL

```
http://<your-ip>:6050/api
```

## Swagger

Interactive API docs: `http://<your-ip>:6050/swagger/index.html`

## Key Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/messages` | List messages |
| `POST` | `/api/messages` | Send a message |
| `GET` | `/api/interfaces` | List interfaces |
| `GET` | `/api/interfaces/health` | Health scores |
| `GET` | `/api/rules` | List access rules |
| `GET` | `/api/config/export` | Export config as YAML |
| `POST` | `/api/config/import` | Import config |
| `GET` | `/api/deliveries` | List deliveries |
| `GET` | `/api/topology` | Mesh topology |
| `GET` | `/api/iridium/modem` | Modem status |
| `GET/POST` | `/api/deadman` | Dead man's switch |
| `GET/POST/DELETE` | `/api/geofences` | Geofence management |
