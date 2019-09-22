const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const { createUser, loginUserWithJWT } = require('../../services/authServices')

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        return res.status(401).json({ message: 'Email already exists' });
    } else {
        try {
            const newUser = await createUser(email, password)


            return res.json({ message: 'User succesfully created', user: newUser });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ message: ' An Error has occured. Please try again later' });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // let loadedUser;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res
                .status(401)
                .json({ message: 'Email or Password is incorrect' });
        }
        const token = await loginUserWithJWT(user)
        return res.json({ token, user: user });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: ' An Error has occured. Please try again later' });
    }
};
