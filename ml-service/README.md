# ML Service

Python-based machine learning prediction service.

## Stack
- Flask or FastAPI (to be decided Monday)
- Dummy ML model initially
- Port: 5000

## Planned Endpoints

### POST /predict
Receives input array and returns prediction.

**Request:**
```json
{
  "input": [1, 2, 3, 4, 5]
}
``` }

**Response:**
```json
{
  "prediction": 3.0,
  "confidence": 0.95
}
```

## Integration
Node.js backend (port 3000) will communicate with this service via HTTP requests.

## Setup (Monday)
```bash
cd ml-service
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask  # or fastapi
python app.py
```

## Status
🔴 Not implemented yet - planned for Monday
```