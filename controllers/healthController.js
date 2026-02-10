// Health check controller
const getHealth = (req, res) => {
    res.json({
        success: true,
        data: {
            status: "OK",
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        },
        error: null
    });
};

module.exports = { getHealth };