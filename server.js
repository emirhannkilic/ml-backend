const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - JSON parser
app.use(express.json());

// Test endpoint
app.get("/test", (req, res) => {
    res.send("Server is running");
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Predict endpoint - returns dummy prediction
app.post("/predict", (req, res) => {
    try {
        const { input } = req.body;
        
        // Input validation
        if (!input || !Array.isArray(input) || input.length === 0) {
            return res.status(400).json({
                error: "Input must be a non-empty array"
            });
        }

        // Dummy prediction response
        const prediction = {
            input: input,
            result: Math.random() * 100,
            confidence: 0.95,
            timestamp: new Date().toISOString()
        };
        
        res.json(prediction);

    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

