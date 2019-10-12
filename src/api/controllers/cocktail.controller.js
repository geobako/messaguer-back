const {
  getCoctailByName,
  getCoctailById,
  getIngredientById,
  getRandomCocktail,
  getCocktailByIngredientName,
  getListByQuery,
  filterCocktailsByCategory,
  filterCocktailsByAlcoholic,
  filterCocktailsByGlass
} = require('../../services/cocktailServices');

exports.searchCocktailByName = async (req, res) => {
  const { name } = req.params;
  try {
    const cocktailList = await getCoctailByName(name);
    return res.status(200).json(cocktailList);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.getCocktailDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const cocktail = await getCoctailById(id);
    return res.status(200).json(cocktail);
  } catch (error) {
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.getIngredientDetails = async (req, res) => {
  const { name } = req.params;
  try {
    const ingredient = await getIngredientById(name);
    return res.status(200).json(ingredient);
  } catch (error) {
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.getRandomCocktail = async (req, res) => {
  try {
    const randomCocktail = await getRandomCocktail();
    return res.status(200).json(randomCocktail);
  } catch (error) {
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.searchByIngredientName = async (req, res) => {
  const { name } = req.params;
  try {
    const ingredientList = await getCocktailByIngredientName(name);
    return res.status(200).json(ingredientList);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.getList = async (req, res) => {
  const { name } = req.query;
  try {
    let query = 'c';
    if (name === 'glass') {
      query = 'g';
    } else if (name === 'ingredient') {
      query = 'i';
    } else if (name === 'alcoholic') {
      query = 'a';
    }
    const list = await getListByQuery(query);
    return res.status(200).json(list);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.filterByCategory = async (req, res) => {
  const { name } = req.params;
  try {
    const cocktails = await filterCocktailsByCategory(name);
    return res.status(200).json(cocktails);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.filterByAlcoholic = async (req, res) => {
  const { name } = req.params;
  try {
    const cocktails = await filterCocktailsByAlcoholic(name);
    return res.status(200).json(cocktails);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};

exports.filterByGlass = async (req, res) => {
  const { name } = req.params;
  try {
    const cocktails = await filterCocktailsByGlass(name);
    return res.status(200).json(cocktails);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ' An Error has occured. Please try again later' });
  }
};
