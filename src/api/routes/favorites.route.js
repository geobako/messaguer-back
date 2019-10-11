const express = require('express');
const {
  addFavorite,
  deleteFavorite
} = require('../controllers/favorite.controller');

const favoritesRouter = express.Router();

/**
 * Add favorite
 */
favoritesRouter.put('/add', addFavorite);
/**
 * Delete favorite
 */
favoritesRouter.delete('/:id/:cocktailId', deleteFavorite);

module.exports = favoritesRouter;
