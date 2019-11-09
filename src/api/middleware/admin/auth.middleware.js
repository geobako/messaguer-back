const jwt = require('jsonwebtoken');
const { adminTokenSecret } = require('../../../config/keys');
const { CustomError, httpStatus } = require('../../../helpers/errorHandling');

exports.authMiddleware = async (req, res, next) => {
    //get the token from the header if present
    const token = req.headers['authorization'].split(' ')[1];
    //if no token found, return response (without going to the next middelware)
    if (!token) throw new CustomError(httpStatus.UNAUTHORIZED, 'Access denied. No token provided.');

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = await jwt.verify(token, adminTokenSecret);
        req.user = decoded;
        next();
    } catch (err) {
        //if invalid token
        next(err);
    }
};
