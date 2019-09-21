const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(401).json({ message: 'Email already exists' });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await new User({
        email,
        password: hashedPassword
      });
      await user.save();

      return res.json({ message: 'User succesfully created' });
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
    let loadedUser;
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
    const token = jwt.sign(
      {
        email: user.email,
        favorites: user.favorites,
        id: user._id.toString()
      },
      keys.tokenKey
    );
    return res.json({ token, user: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};
