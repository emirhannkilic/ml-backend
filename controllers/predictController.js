const mlService = require('../src/services/mlService');


const predict = async (req, res) => {
    try {
        const { input } = req.body;
        
        // Input validation
        if (!input || !Array.isArray(input) || input.length === 0) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Input must be a non-empty array"
            });
        }

        // Call ML service
        const mlResult = await mlService.predict(input);

        // Handle ML service errors
        if (!mlResult.success) {
            return res.status(mlResult.statusCode || 500).json({
                success: false,
                data: null,
                error: mlResult.error
            });
        }


        // Success response
        const response = {
            success: true,
            data: {
                input: input,
                result: mlResult.data.prediction,
                confidence: mlResult.data.confidence,
                timestamp: new Date().toISOString()
            },
            error: null
        };
        
        res.json(response);
        
    } catch (error) {
        // unexpected errors
        res.status(500).json({
            success: false,
            data: null,
            error: "Internal server error: ${error.message}"
        });
    }
};

module.exports = { predict };