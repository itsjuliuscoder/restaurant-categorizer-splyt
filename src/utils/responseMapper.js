const mapYelpBusinesses = (businesses) => {
    return businesses.map(business => ({
        name: business.name,
        address: business.location?.display_address?.join(', ') || 'Address not available',
        rating: business.rating || 'N/A',
        phone: business.display_phone || 'Not available',
        image_url: business.image_url || 'No image available',
        yelp_id: business.id,
        categories: business.categories ? business.categories.map((category) => category.title) : [], // Handle missing categories
        price: business.price || 'Price not available', // Include price
        link: business.url || 'No link available',
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
    let mappedGoogleResults = [];
    let mappedYelpResults = [];

    try {
        mappedGoogleResults = mapGooglePlaces(googleResults);
    } catch (error) {
        console.error("Error mapping Google Places results:", error.message);
    }

    try {
        mappedYelpResults = mapYelpBusinesses(yelpResults);
    } catch (error) {
        console.error("Error mapping Yelp results:", error.message);
    }

    return [...mappedGoogleResults, ...mappedYelpResults];
};

module.exports = { combineResults };