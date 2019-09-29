const express = require('express');
const {
    searchCocktailByName,
    getCocktailDetails,
    getIngredientDetails,
    getRandomCocktail,
    searchByIngredientName,
    getList,
    filterByCategory,
    filterByAlcoholic,
    filterByGlass
} = require('../controllers/cocktail.controller');

const cocktailRouter = express.Router();

/** 
 * Search cocktails
 */
cocktailRouter.get('/search/:name', searchCocktailByName);
/**
 * Get Single cocktail by id
 */
cocktailRouter.get('/single/:id', getCocktailDetails)
/**
 * Get single ingredient by id
 */
cocktailRouter.get('/ingredient/single/:id', getIngredientDetails)
/**
 * Search cocktails by ingredient name
 */
cocktailRouter.get('/ingredient/search/:name', searchByIngredientName)
/**
 * Get a random cocktail
 */
cocktailRouter.get('/random', getRandomCocktail)
/**
 * Get categories, glasses, ingredient, alcoholic by query (name)
 */
cocktailRouter.get('/list', getList)
/**
 * Filter cocktails by category name
 */
cocktailRouter.get('/filter/category/:name', filterByCategory)
/**
 * Filter cocktails by alcoholic name
 */
cocktailRouter.get('/filter/alcoholic/:name', filterByAlcoholic)
/**
 * Filter cocktails by glass name
 */
cocktailRouter.get('/filter/glass/:name', filterByGlass)

module.exports = cocktailRouter;