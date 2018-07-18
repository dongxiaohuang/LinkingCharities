const Categories = require('../models/categories');
const express = require('express');
const categoriesRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('./cors');

categoriesRouter.use(bodyParser.json());

categoriesRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200);})
//TODO: admin check
.get(cors.cors, (req, res, next) => {
     Categories.find({})
          .then((categories) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    success: true,
                    message: "Success",
                    categories: categories
               })
          }, err=> next(err))
          .catch(err => next(err))
})
.post(cors.corsWithOptions, (req, res, next) => {
     Categories.create(req.body)
          .then((category) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    success: true,
                    message: "Success create category",
                    categories: category
               })
          }, err => next(err))
          .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
     res.statusCode = 403;
     res.end('PUT is not supported on endpoint /categories');
})
.delete(cors.corsWithOptions, (req, res, next) => {
     Categories.remove({})
          .then(resp => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    success: true,
                    message: "Success remove categories",
                    result: resp
               })
          }, err => next(err))
          .catch(err => next(err))
})
module.exports = categoriesRouter;
