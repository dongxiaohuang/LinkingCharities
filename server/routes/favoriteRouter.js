const express = require('express');
const bodyParser = require('body-parser');

const Favorites = require('../models/favorites');
const cors = require('./cors');
var authenticate = require('../authenticate');
const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

module.exports = favoriteRouter;
