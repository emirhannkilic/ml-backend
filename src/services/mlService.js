const axios = require('axios');

// ML Service configuration
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';

/**
 * Call Python ML service for prediction
 * @param {Array<number>} input - Array of numbers to predict
 * @returns {Promise<Object>} Prediction result from ML service
 */
const predict = async (input) => {
    try {
        const response = await axios.post(`${ML_SERVICE_URL}/predict`, {
            input: input
        });
        
        return {
            success: true,
            data: response.data
        };
        
    } catch (error) {
        // ML service is down or returned error
        if (error.response) {
            // ML service responded with error
            return {
                success: false,
                error: `ML service error: ${error.response.data.detail || error.response.statusText}`,
                statusCode: error.response.status
            };
        } else if (error.request) {
            // ML service didn't respond (down/timeout)
            return {
                success: false,
                error: 'ML service unavailable',
                statusCode: 503
            };
        } else {
            // Other errors
            return {
                success: false,
                error: `Request error: ${error.message}`,
                statusCode: 500
            };
        }
    }
};

module.exports = {
    predict
};