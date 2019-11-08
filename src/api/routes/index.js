const express = require('express');

/*
import admin routes
*/
const authRoutes = require('./admin/auth.route');

/*
initialize router
*/
const router = express.Router();

/*
Use admin routes
*/
router.use('/admin/auth', authRoutes);

//test route
router.get('/test', (req, res) => {
  res.json({ message: 'server is live' });
});

// "build": "babel src --out-dir dist",

module.exports = router;
