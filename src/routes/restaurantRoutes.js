const express = require('express');
const { searchRestaurants } = require('../controllers/restaurantController');
const router = express.Router();

// Middleware to validate request parameters
const validateSearchParams = (req, res, next) => {
    const { experience, location } = req.body;
    if (!experience || !location) {
        return res.status(400).json({ error: 'Experience and location parameters are required' });
    }
    next();
};

router.post('/search', validateSearchParams, searchRestaurants);

module.exports = router;
