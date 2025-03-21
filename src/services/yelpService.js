const axios = require('axios');
const { YELP_API_KEY } = require('../config/config');
const { getCoordinates } = require('./googlePlacesService');
const { mapCustomerPriceToYelp, mapYelpPriceToRange } = require('../utils/priceMapper');

const getYelpBusinesses = async (query, location, price) => {
    console.log('Yelp Query:', query);
    const apiKey = process.env.YELP_API_KEY;
    const url = `https://api.yelp.com/v3/businesses/search`;
    const priceFilter = mapCustomerPriceToYelp(price);

    console.log('Yelp Price Filter:', priceFilter);
    const APIKEY = "BMws29bk-FexA8CCzosWEaapxa1VbYdM66ZNfxGN16daBtZx-SJ7MbFsAmZnZAtTi0qY9nQZzLS7TgdZHFhKkNWug4BT8UqF2pn5DmNm59RzGxujVXHK_jkKhIbYZ3Yx";
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${APIKEY}`,
            },
            params: {
                term: 'restaurants',
                categories: query,
                location,
                sort_by: "rating",
                price: priceFilter, // Use mapped price level
            },
        });

        // console.log("Yelp API Response:", JSON.stringify(response.data));

        const businesses = response.data.businesses.map((business) => ({
            name: business.name,
            rating: business.rating || 'N/A',
            price: mapYelpPriceToRange(business.price?.length || 1), // Yelp uses $ signs, convert them
            address: business.location?.display_address?.join(", ") || 'Address not available',
            phone: business.display_phone || 'Not available',
            image_url: business.image_url || 'No image available',
            categories: business.categories ? business.categories.map((category) => category.title) : [], // Handle missing categories
            yelp_id: business.id,
            link: business.url,
            source: 'Yelp'
        }));

        //console.log(`Yelp API Response for ${query} in ${location}:`, response.data);

        return businesses;
    } catch (error) {
        console.error("Yelp API Error:", error.message);
        console.error("Yelp API Error Response Data:", error.response.data);
        throw error;
    }
};

module.exports = { getYelpBusinesses };