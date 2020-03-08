const dotenv = require('dotenv');

/*
configure NODE_ENV
*/
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const keys = {
    adminTokenSecret: process.env.ADMIN_TOKEN_SECRET,
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
};

module.exports = keys;
