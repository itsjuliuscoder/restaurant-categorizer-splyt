const mapYelpBusinesses = (businesses) => {
    return businesses.map(business => ({
        name: business.name,
        address: business.location?.display_address?.join(', ') || 'Address not available',
        rating: business.rating || 'N/A',
        phone: business.display_phone || 'Not available',
        image_url: business.image_url || 'No image available',
        yelp_id: business.id,
        categories: business.categories.map((category) => category.title), // Corrected variable name
        source: 'Yelp'
    }));
};

const mapGooglePlaces = (places) => {
    return places.map(place => ({
        name: place.name,
        address: place.formatted_address || 'Address not available',
        rating: place.rating || 'N/A',
        phone: place.phone || 'Not available',
        image_url: place.image_url || 'No image available',
        place_id: place.place_id,
        categories: place.types,
        source: 'Google'
    }));
};

const combineResults = (googleResults, yelpResults) => {
    const mappedGoogleResults = mapGooglePlaces(googleResults);
    const mappedYelpResults = mapYelpBusinesses(yelpResults);

    return [...mappedGoogleResults, ...mappedYelpResults];
};

module.exports = { combineResults };