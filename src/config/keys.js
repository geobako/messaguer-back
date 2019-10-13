const dotenv = require('dotenv');

/*
configure NODE_ENV
*/
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const keys = {
  tokenKey: process.env.TOKEN,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  cocktailDBUrl: `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_DB_KEY}`,
  cocktailDBPhotoUrl: 'https://www.thecocktaildb.com/images',
  foursquareClientId: process.env.FOURSQUARE_CLIENT_ID,
  foursquareSecret: process.env.FOURSQUARE_SECRET
};

module.exports = keys;
