const express = require('express');

/*
import admin routes
*/
const adminAuthRoutes = require('./admin/auth.route');

/*
initialize router
*/
const router = express.Router();

/*
Use admin routes
*/
router.use('/admin/auth', adminAuthRoutes);

//test route
router.get('/test', (req, res) => {
    res.json({ message: 'server is live' });
});

module.exports = router;
