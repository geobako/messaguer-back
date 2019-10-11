const express = require('express');
const {
  login,
  register,
  getUserFromToken
} = require('../controllers/auth.controller');

const AuthRouter = express.Router();

AuthRouter.post('/login', login);
AuthRouter.post('/register', register);
AuthRouter.get('/get-user/:token', getUserFromToken);

module.exports = AuthRouter;
