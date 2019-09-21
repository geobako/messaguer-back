const dotenv = require('dotenv');

/*
configure NODE_ENV
*/
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const keys = {
  tokenKey: process.env.TOKEN,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING
};

module.exports = keys;
