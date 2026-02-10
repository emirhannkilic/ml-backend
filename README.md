# ML Backend

Node.js + Express backend with Python FastAPI ML service integration.

## Architecture
```
Client (Postman/Frontend)
    ↓
Node.js API Gateway (port 3000)
    ↓ HTTP Request
Python ML Service (port 5001)
    ↓ Prediction
Node.js → Client
```

## Project Structure
```
ml-backend/
├── src/
│   └── services/
│       └── mlService.js      # Python ML service integration
├── controllers/
│   ├── healthController.js   # Health check logic
│   └── predictController.js  # Prediction logic
├── routes/
│   ├── health.js             # Health routes
│   └── predict.js            # Prediction routes
├── ml-service/               # Python FastAPI service
│   ├── venv/
│   ├── app.py                # FastAPI application
│   └── README.md
├── .env                      # Environment variables (not in git)
├── .env.example              # Example environment variables
├── server.js                 # Express server setup
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory:
```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
ML_SERVICE_URL=http://127.0.0.1:5001
```

## API Endpoints

All endpoints return standardized responses:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

**Error:**
```json
{
  "success": false,
  "data": null,
  "error": "error message"
}
```

---

### GET /test
Simple test endpoint.

**Response:**
```
Server is running
```

---

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "OK",
    "timestamp": "2026-02-11T12:00:00.000Z",
    "uptime": 123.45
  },
  "error": null
}
```

---

### POST /api/predict
ML prediction endpoint.

**Request:**
```json
{
  "input": [10, 20, 30, 40, 50]
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "input": [10, 20, 30, 40, 50],
    "result": 30.0,
    "confidence": 0.95,
    "timestamp": "2026-02-11T12:00:00.000Z"
  },
  "error": null
}
```

**Error Response (ML service down):**
```json
{
  "success": false,
  "data": null,
  "error": "ML service unavailable"
}
```

**Validation Error:**
```json
{
  "success": false,
  "data": null,
  "error": "Input must be a non-empty array"
}
```

## Setup & Run

### 1. Install Node.js dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` if needed.

### 3. Start Python ML service

See `ml-service/README.md` for Python setup instructions.
```bash
cd ml-service
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app:app --reload --host 0.0.0.0 --port 5001
```

### 4. Start Node.js server (in a new terminal)
```bash
npm run dev  # Development mode with auto-reload
# or
npm start    # Production mode
```

### 5. Test

Node.js server: `http://localhost:3000`  
Python ML service: `http://127.0.0.1:5001`

Use Postman or any REST client to test endpoints.

## Development

**Dev mode (auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## Features

- ✅ RESTful API with Express
- ✅ Python ML service integration via HTTP
- ✅ Service layer architecture
- ✅ Standardized API responses
- ✅ Environment-based configuration
- ✅ CORS support
- ✅ Error handling and resilience
- ✅ Input validation

## Architecture Decisions

**Service Layer Pattern:**
- `mlService.js` isolates Python integration
- Controllers focus on HTTP logic
- Easy to swap ML backends

**Standardized Responses:**
- All endpoints return `{success, data, error}`
- Consistent error handling
- Frontend-ready format

**Microservices:**
- Node.js: API gateway, validation, orchestration
- Python: ML inference only
- Independent deployment and scaling

## Next Steps

- [ ] Add authentication
- [ ] Rate limiting
- [ ] Request logging
- [ ] Real ML model (replace dummy average)
- [ ] Unit tests
- [ ] API documentation (Swagger)
- [ ] Docker containerization

## Notes

This is a learning project demonstrating:
- Node.js + Python integration
- Clean architecture principles
- RESTful API design
- Error handling and resilience