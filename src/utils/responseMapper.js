const mapYelpBusinesses = (businesses) => {
    return businesses.map(business => ({
        name: business.name,
        address: business.address || 'Address not available',
        rating: business.rating || 'N/A',
        phone: business.phone || 'Not available',
        image_url: business.image_url || 'No image available',
        yelp_id: business.id,
        categories: business.categories, // Corrected variable name
        price: business.price || 'Price not available', // Include price
        link: business.link || 'No link available',
        source: 'Yelp'
    }));
};

const mapGooglePlaces = (places) => {
    return places.map(place => ({
        name: place.name,
        address: place.address || 'Address not available',
        rating: place.rating || 'N/A',
        phone: place.phone || 'Not available',
        image_url: place.image_url || 'No image available',
        place_id: place.place_id,
        categories: place.types,
        price: place.price || 'Price not available', // Include price
        link: place.google_maps_url || 'No link available',
        source: 'Google'
    }));
};

const combineResults = (googleResults, yelpResults) => {
    const mappedGoogleResults = mapGooglePlaces(googleResults);
    const mappedYelpResults = mapYelpBusinesses(yelpResults);

    return [...mappedYelpResults, ...mappedGoogleResults];
};

module.exports = { combineResults };