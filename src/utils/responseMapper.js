const mapYelpBusinesses = (businesses) => {
    try {
        return businesses.map(business => ({
            name: business.name,
            address: business.address,
            rating: business.rating || 'N/A',
            phone: business.phone || 'Not available',
            image_url: business.image_url || 'No image available',
            yelp_id: business.id,
            categories: business.categories,
            price: business.price || 'Price not available',
            link: business.link || 'No link available',
            source: 'Yelp'
        }));
    } catch (error) {
        console.error("Error mapping Yelp businesses:", error.message);
        return []; // Return an empty array if mapping fails
    }
};

const mapGooglePlaces = (places) => {
    try {
        return places.map(place => ({
            name: place.name,
            address: place.address || 'Address not available',
            rating: place.rating || 'N/A',
            phone: place.phone || 'Not available',
            image_url: place.image_url || 'No image available',
            place_id: place.place_id,
            categories: place.types || [], // Handle missing categories
            price: place.price || 'Price not available',
            link: place.google_maps_url || 'No link available',
            source: 'Google'
        }));
    } catch (error) {
        console.error("Error mapping Google Places:", error.message);
        return []; // Return an empty array if mapping fails
    }
};

const combineResults = (googleResults, yelpResults) => {
    // Map results in parallel
    const mappedGoogleResults = mapGooglePlaces(googleResults);
    const mappedYelpResults = mapYelpBusinesses(yelpResults);

    // Combine results
    return [...mappedYelpResults, ...mappedGoogleResults];
};

module.exports = { combineResults };