const express = require("express");
const Router = express.Router();

const { login, dashboard } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

Router.route('/login').post(login);
Router.route('/dashboard').get(authMiddleware,dashboard);


module.exports = Router;