const User = require('../../models/user.model.js');
const bcrypt = require('bcryptjs');
const { createUser, loginUserWithJWT, decodeTokenAndGetUser } = require('../../../services/authServices');

exports.getUserFromToken = async (req, res) => {
    const { token } = req.params;
    try {
        const decodedUser = await decodeTokenAndGetUser(token);

        return res.json({ user: decodedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ' An Error has occured. Please try again later' });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        return res.status(401).json({ message: 'Email already exists' });
    } else {
        try {
            const newUser = await createUser(email, password);

            return res.json({ message: 'User succesfully created' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: ' An Error has occured. Please try again later' });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const { name, avatar } = req.body;
        // let loadedUser;
        const user = await User.findOne({ name });
        if (!user) {
            const newUser = await new User({ name, avatar }).save();
            return res.status(200).json({ message: 'User ok', user: newUser });
        }

        return res.json({ message: 'User ok', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ' An Error has occured. Please try again later' });
    }
};
