const { getPlaces } = require('../services/googlePlacesService');
const { getYelpBusinesses } = require('../services/yelpService');
const { combineResults } = require('../utils/responseMapper');
const { matchCategories } = require('../utils/categorizer');

const searchRestaurants = async (req, res, next) => {
    try {
        const { experience, location, budget } = req.body;

        // Get matching categories
        const categories = matchCategories(experience);

        const price = budget;

        // Query APIs
        let googleResults = [];
        let yelpResults = [];

        try {
            googleResults = await getPlaces(categories.join(' OR '), location, experience, price);
        } catch (error) {
            console.error("Error fetching Google Places results:", error.message);
        }

        try {
            yelpResults = await getYelpBusinesses(categories.join(','), location, price);
        } catch (error) {
            console.error("Error fetching Yelp results:", error.message);
        }

        // Combine and return results
        const results = combineResults(googleResults, yelpResults);
        res.json(results);
    } catch (error) {
        next(error);
    }
};

module.exports = { searchRestaurants };