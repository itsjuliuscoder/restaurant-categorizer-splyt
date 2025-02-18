const axios = require('axios');
const { YELP_API_KEY } = require('../config/config');
const { getCoordinates } = require('./googlePlacesService');

const getYelpBusinesses = async (query, location) => {

    console.log('Yelp Query:', query);
    const apiKey = process.env.YELP_API_KEY;
    const url = `https://api.yelp.com/v3/businesses/search`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          term: 'restaurants',
          categories: query,
          location,
          sort_by: 'rating',
        },
      });
      
      //console.log("This from Yelp", response.data.businesses);
      return response.data.businesses;
      
  
    } catch (error) {
      console.error("Yelp API Error:", error.message);
      throw error;
    }
};

module.exports = { getYelpBusinesses };
