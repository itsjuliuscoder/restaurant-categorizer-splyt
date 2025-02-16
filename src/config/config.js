require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 9002,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    YELP_API_KEY: process.env.YELP_API_KEY,
};
