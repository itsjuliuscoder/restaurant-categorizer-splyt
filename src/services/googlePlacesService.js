const axios = require('axios');
const { GOOGLE_API_KEY } = require('../config/config');
const { types } = require('@babel/core');

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

    console.log(`Google API Response for ${query} in ${city}:`, data);

    if (data.results && data.results.length > 0) {
        // Sort results by rating (highest first)
        const sortedResults = data.results.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        // Fetch additional details (phone number, photos) for each place
        const detailedResults = await Promise.all(sortedResults.map(async (place) => {
            const details = await getPlaceDetails(place.place_id);
            return {
                name: place.name,
                address: place.formatted_address,
                rating: place.rating || 'N/A',
                phone: details.phone,
                image_url: details.photo,
                place_id: place.place_id,
                types: place.types,
            };
        }));

        return detailedResults;
    }

    return []; // Return an empty array if no results are found
};

// Function to get additional place details (phone number, photos)
const getPlaceDetails = async (placeId) => {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json`;
    const params = {
        place_id: placeId,
        fields: 'formatted_phone_number,photos',
        key: GOOGLE_API_KEY,
    };

    try {
        const { data } = await axios.get(detailsUrl, { params });

        return {
            phone: data.result?.formatted_phone_number || 'Not available',
            photo: data.result?.photos?.length
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.result.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                : 'No image available'
        };
    } catch (error) {
        console.error(`Error fetching details for place ID ${placeId}:`, error.message);
        return { phone: 'Not available', photo: 'No image available' };
    }
};

// Function to get city coordinates
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
