const User = require('../models/user.model');

exports.addFavorite = async (req, res) => {
  const { favorite, id } = req.body;
  try {
    const user = await User.findById(id);
    user.favorites.unshift(favorite);
    await user.save();
    return res.status(200).json();
  } catch (error) {
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.deleteFavorite = async (req, res) => {
  const { id, cocktailId } = req.params;
  try {
    // const cocktail = await getCoctailById(id);
    const user = await User.findById(id);
    user.favorites = user.favorites.filter(el => el.idDrink !== cocktailId);
    await user.save();
    return res.status(200).json();
  } catch (error) {
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};
