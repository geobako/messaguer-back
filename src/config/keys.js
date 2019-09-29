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
    cocktailDBUrl: 'https://www.thecocktaildb.com/api/json/v1/1',
    cocktailDBPhotoUrl: "https://www.thecocktaildb.com/images"
};

module.exports = keys;
