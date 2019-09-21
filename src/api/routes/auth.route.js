const express = require('express');
const { login, register } = require('../controllers/auth.controller');

const AuthRouter = express.Router();

AuthRouter.post('/login', login);
AuthRouter.post('/register', register);

module.exports = AuthRouter;
