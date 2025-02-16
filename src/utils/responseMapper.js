const mapGooglePlaces = (places) =>
    places.map((place) => ({
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        categories: place.types, // Add categories
        source: 'Google',
    }));

const mapYelpBusinesses = (businesses) =>
    businesses.map((biz) => ({
        name: biz.name,
        address: biz.location.display_address.join(', '),
        rating: biz.rating,
        categories: biz.categories.map((category) => category.title), // Add categories
        source: 'Yelp',
    }));

const combineResults = (googleResults, yelpResults) => [
    ...mapGooglePlaces(googleResults),
    ...mapYelpBusinesses(yelpResults),
];

module.exports = { combineResults };
