const axios = require('axios');
const { cocktailDBUrl } = require('../config/keys');

exports.getCoctailByName = async name => {
  const searchResponse = await axios.get(
    `${cocktailDBUrl}/search.php?s=${name}`
  );
  return searchResponse.data;
};

exports.getCoctailById = async id => {
  const singleCocktailResponseResponse = await axios.get(
    `${cocktailDBUrl}/lookup.php?i=${id}`
  );
  return singleCocktailResponseResponse.data;
};

exports.getIngredientById = async name => {
  const singleIngredientResponse = await axios.get(
    `${cocktailDBUrl}/search.php?i=${name}`
  );
  return singleIngredientResponse.data;
};

exports.getRandomCocktail = async () => {
  const randomCocktailResponse = await axios.get(`${cocktailDBUrl}/random.php`);
  return randomCocktailResponse.data;
};

exports.getCocktailByIngredientName = async name => {
  const ingredientSearchResponse = await axios.get(
    `${cocktailDBUrl}/filter.php?i=${name}`
  );
  return ingredientSearchResponse.data;
};

exports.getListByQuery = async query => {
  const listResponse = await axios.get(
    `${cocktailDBUrl}/list.php?${query}=list`
  );
  return listResponse.data;
};

exports.filterCocktailsByCategory = async name => {
  const cocktailResponse = await axios.get(
    `${cocktailDBUrl}/filter.php?c=${name}`
  );
  return cocktailResponse.data;
};

exports.filterCocktailsByAlcoholic = async name => {
  const cocktailResponse = await axios.get(
    `${cocktailDBUrl}/filter.php?a=${name}`
  );
  return cocktailResponse.data;
};

exports.filterCocktailsByGlass = async name => {
  const cocktailResponse = await axios.get(
    `${cocktailDBUrl}/filter.php?g=${name}`
  );
  return cocktailResponse.data;
};
