const { getPlaces } = require('../services/googlePlacesService');
const { getYelpBusinesses } = require('../services/yelpService');
const { combineResults } = require('../utils/responseMapper');
const { matchCategories } = require('../utils/categorizer');

const searchRestaurants = async (req, res, next) => {
    try {
        const { experience, location } = req.body;

        // Get matching categories
        const categories = matchCategories(experience);

        // Query APIs
        const googleResults = await getPlaces(categories.join(' OR '), location, experience);
        const yelpResults = await getYelpBusinesses(categories.join(','), location);
        
        // console.log('Yelp Results:', yelpResults);
        // Combine and return results
        const results = combineResults(googleResults, yelpResults);
        res.json(results);
    } catch (error) {
        next(error);
    }
};

module.exports = { searchRestaurants };
