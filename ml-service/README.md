```
# ML Service

Python FastAPI-based machine learning prediction service.

## Stack

- **Framework:** FastAPI
- **Server:** Uvicorn
- **Port:** 5001
- **Python:** 3.14+
- **ML Model:** Dummy (average calculation) - real model to be integrated

## Project Structure

```
ml-service/
├── venv/              # Virtual environment (not in git)
├── app.py             # FastAPI application
├── requirements.txt   # Python dependencies
├── .gitignore
└── README.md
```

## API Endpoints

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "service": "ML Service"
}
```

---

### POST /predict

ML prediction endpoint. Currently returns the average of input array (dummy model).

**Request:**
```json
{
  "input": [10, 20, 30, 40, 50]
}
```

**Success Response:**
```json
{
  "prediction": 30.0,
  "confidence": 0.95
}
```

**Validation Error:**
```json
{
  "detail": [
    {
      "loc": ["body", "input"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## Setup & Run

### 1. Create virtual environment

```bash
cd ml-service
python3 -m venv venv
```

### 2. Activate virtual environment

**Mac/Linux:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist yet:
```bash
pip install fastapi uvicorn
```

### 4. Run the service

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 5001
```

**Options:**
- `--reload`: Auto-reload on code changes (development)
- `--host 0.0.0.0`: Listen on all network interfaces
- `--port 5001`: Port number

### 5. Test

Open browser:
- Health: `http://127.0.0.1:5001/health`
- Docs: `http://127.0.0.1:5001/docs` (automatic FastAPI documentation)

## Integration

This service is called by the Node.js backend (port 3000) via HTTP requests.

**Flow:**
```
Client → Node.js (3000) → Python ML Service (5001) → Node.js → Client
```

Node.js handles:
- Authentication
- Validation
- Rate limiting
- Response formatting

Python handles:
- ML inference only

## Current Model

**Dummy model:** Calculates the average of input array.

```python
prediction = sum(input_array) / len(input_array)
```

**Example:**
- Input: `[10, 20, 30]`
- Output: `30.0` (average)

## Next Steps

- [ ] Replace dummy model with real ML model
- [ ] Add model loading logic
- [ ] Add input preprocessing
- [ ] Add model versioning
- [ ] Add performance monitoring
- [ ] Add unit tests

## Development

**Auto-reload mode (recommended):**
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 5001
```

**Production mode:**
```bash
uvicorn app:app --host 0.0.0.0 --port 5001 --workers 4
```

## FastAPI Features

- ✅ Automatic API documentation (`/docs`)
- ✅ Request/response validation with Pydantic
- ✅ Type hints
- ✅ High performance (async support)
- ✅ Easy to test

## Troubleshooting

**Port 5001 already in use:**
```bash
# Kill process using port 5001
lsof -ti:5001 | xargs kill -9

# Or use different port
uvicorn app:app --reload --host 0.0.0.0 --port 5002
```

**Virtual environment issues:**
```bash
# Delete and recreate
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
```

## Status

🟢 **Active** - Service is running and integrated with Node.js backend
```