const keys = require('../../config/keys');
const axios = require('axios');

exports.getPlaces = async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&query=cocktail&limit=15&client_id=${keys.foursquareClientId}&client_secret=${keys.foursquareSecret}&v=20191013`;
  try {
    const response = await axios.get(url);

    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};
