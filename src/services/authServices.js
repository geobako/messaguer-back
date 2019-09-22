const User = require('../api/models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

exports.createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
        email,
        password: hashedPassword
    }).save();

    return newUser;
}

exports.loginUserWithJWT = async (user) => {
    const token = jwt.sign(
        {
            email: user.email,
            favorites: user.favorites,
            id: user._id.toString()
        },
        keys.tokenKey
    );
    return token
}