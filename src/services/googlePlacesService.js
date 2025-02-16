const axios = require('axios');
const { GOOGLE_API_KEY } = require('../config/config');

const getPlaces = async (query, city, experience) => {
    console.log('Google Query:', query, 'These are the others', city, experience);
    const detailExperience = experience + ' in ' + city;
    const location = await getCoordinates(city);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const params = {
        query: detailExperience,
        type: query,
        location,
        radius: 10000, // 10km radius
        key: GOOGLE_API_KEY,
    };
    const { data } = await axios.get(url, { params });

    // console.log(`Google API Response for ${query} in ${city}:`, data);

    if (data.results && data.results.length > 0) {
      // Sort the results by rating in descending order
      const sortedResults = data.results.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      // console.log("google response", sortedResults);
      return sortedResults;
    }

    return []; // Return an empty array if no results are found
    // return data.results;
};

const getCoordinates = async (city) => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await axios.get(geocodeUrl);
    const location = response.data.results[0]?.geometry?.location;

    if (!location) {
      throw new Error(`Could not fetch coordinates for city: ${city}`);
    }

    return `${location.lat},${location.lng}`;
  } catch (error) {
    console.error(`Error fetching coordinates for ${city}:`, error.message);
    throw error;
  }
};

module.exports = { getPlaces, getCoordinates };
