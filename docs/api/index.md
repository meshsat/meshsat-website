# API Reference

MeshSat exposes a REST API on port 6050 for managing transports, sending messages, querying history, and monitoring system health.

## Base URL

```
http://<device-ip>:6050/api/v1
```

## Interactive Documentation

MeshSat ships with embedded Swagger/OpenAPI documentation. Access it at:

```
http://<device-ip>:6050/swagger/
```

The Swagger UI provides interactive exploration of all endpoints, request/response schemas, and the ability to execute API calls directly from the browser.

## Authentication

MeshSat Bridge (standalone mode) does not require authentication by default. When running behind MeshSat Hub, API requests must include a valid API key:

```
Authorization: Bearer <api-key>
```

## Core Endpoints

### Health

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/health` | System health and version info |

### Messages

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/messages` | List messages with filtering and pagination |
| `POST` | `/api/v1/messages` | Send a message via a specified transport |
| `GET` | `/api/v1/messages/:id` | Get a single message by ID |

### Transports

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/transports` | List all configured transports and their status |
| `GET` | `/api/v1/transports/:name` | Get detailed status for a specific transport |
| `POST` | `/api/v1/transports/:name/restart` | Restart a transport connection |

### Policies

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/policies` | List all routing policies |
| `POST` | `/api/v1/policies` | Create a new routing policy |
| `PUT` | `/api/v1/policies/:id` | Update an existing policy |
| `DELETE` | `/api/v1/policies/:id` | Delete a policy |

### Metrics

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/metrics` | Prometheus-format metrics |

## Request/Response Format

All endpoints accept and return JSON. Example message creation:

**Request:**

```bash
curl -X POST http://localhost:6050/api/v1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "transport": "meshtastic",
    "destination": "^all",
    "payload": "Hello from MeshSat!",
    "priority": "normal"
  }'
```

**Response:**

```json
{
  "id": "msg_01HQXYZ...",
  "transport": "meshtastic",
  "direction": "outgoing",
  "destination": "^all",
  "payload": "Hello from MeshSat!",
  "priority": "normal",
  "status": "sent",
  "created_at": "2026-03-23T12:00:00Z"
}
```

## WebSocket

MeshSat provides a WebSocket endpoint for real-time message streaming:

```
ws://<device-ip>:6050/api/v1/ws
```

Connect to receive live updates as messages flow through the system. See [WebSocket](/api/websocket) for the message format and subscription options.

## Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "code": "TRANSPORT_NOT_FOUND",
    "message": "Transport 'iridium_sbd' is not configured",
    "status": 404
  }
}
```

## Rate Limiting

The API does not enforce rate limits in standalone Bridge mode. When connected to Hub, rate limits are configured per API key by the tenant administrator.
