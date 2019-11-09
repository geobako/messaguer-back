const dotenv = require('dotenv');

/*
configure NODE_ENV
*/
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const keys = {
    adminTokenSecret: process.env.ADMIN_TOKEN_SECRET,
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING
};

module.exports = keys;
