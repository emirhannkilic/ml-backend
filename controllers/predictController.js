// Predict controller - returns dummy prediction
const predict = (req, res) => {
    try {
        const { input } = req.body;
        
        // Input validation - expecting array of numbers
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
};

module.exports = { predict };