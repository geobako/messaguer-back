
const jwt = require("jsonwebtoken");
const { tokenKey } = require("../../config/keys");

exports.authMiddleware = async (req, res, next) => {
    //get the token from the header if present
    const token = req.headers["authorization"].split(' ')[1];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = await jwt.verify(token, tokenKey);
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        res.status(400).json({ message: "Invalid token." });
    }
};