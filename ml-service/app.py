from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()


# Request model
class PredictRequest(BaseModel):
    input: List[float]

# Response model
class PredictResponse(BaseModel):
    prediction: float
    confidence: float

# Health check endpoint
@app.get("/health")
def health():
    return {
        "status": "OK",
        "service": "ML Service"
    }

# Predict endpoint
@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    # Dummy ML model - calculate average
    input_array = request.input
    if len(input_array) == 0:
        return {
            "prediction": 0.0,
            "confidence": 0.0
        }
    
    # Simple prediction: average of inputs
    prediction = sum(input_array) / len(input_array)
    confidence = 0.95

    return {
        "prediction": prediction,
        "confidence": confidence
    }