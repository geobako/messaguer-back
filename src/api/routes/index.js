const express = require('express');

/*
import routes
*/
const authRoutes = require('./auth.route');
const cocktailRoutes = require('./cocktail.route')

/*
initialize router
*/
const router = express.Router();

/*
Use routes
*/
router.use('/auth', authRoutes);
router.use('/cocktail', cocktailRoutes);

//test route
router.get('/test', (req, res) => {
    res.json({ message: 'server is live' });
});

// "build": "babel src --out-dir dist",

module.exports = router;
