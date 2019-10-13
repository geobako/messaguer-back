const express = require('express');
const { getPlaces } = require('../controllers/places.controller');

const PlacesRouter = express.Router();

PlacesRouter.get('/nearby', getPlaces);

module.exports = PlacesRouter;
