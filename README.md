# ML Backend

A simple Node.js + Express backend with prediction API endpoints.

## Project Structure
```
ml-backend/
├── node_modules/
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Endpoints

### GET /test
Test endpoint to verify server is running.

**Response:**
```
Server is running
```

### GET /health
Health check endpoint with server status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-07T11:14:02.694Z",
  "uptime": 123.45
}
```

### POST /predict
Prediction endpoint (currently returns dummy data).

**Request:**
```json
{
  "input": "test data"
}
```

**Response:**
```json
{
  "input": "test data",
  "result": 88.23,
  "confidence": 0.95,
  "timestamp": "2026-02-07T11:14:02.694Z"
}
```

## Setup & Run

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node server.js
```

3. Server will run on: `http://localhost:3000`

## Testing

Use Postman or any REST client to test the endpoints.

## Next Steps (Monday)

- [ ] Integrate ML model into /predict endpoint
- [ ] Replace dummy prediction with actual model inference
- [ ] Add input preprocessing
- [ ] Add model loading logic

## Notes

This is a learning project focused on backend fundamentals. The prediction endpoint currently returns random values - ML integration planned for next phase.