const searchRouter = require('express').Router();
const config = require('../config');
const cors = require('./cors');
const Categories = require('../models/categories');
const Charities = require('../models/charities');
const async = require('async');

//TODO: implement all routes
// TODO: search labels;

searchRouter.route('/')
     .options(cors.corsWithOptions, (req, res) => {
          sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          var perPage = 10;
          var page = req.query.page;

          console.log(req.query.q)
          let query = req.query.q.toLowerCase();
          let queryExpress = [{
                    "name": {
                         "$regex": req.query.q,
                         "$options": "i"
                    }
               },
               {
                    "city": {
                         "$regex": req.query.q,
                         "$options": "i"
                    }
               },
               {
                    "country": {
                         "$regex": req.query.q,
                         "$options": "i"
                    }
               },
               {
                    "state": {
                         "$regex": req.query.q,
                         "$options": "i"
                    }
               }
          ]
          Categories.findOne({
                    "name": {
                         "$regex": query,
                         "$options": "i"
                    }
               })
               .then(result => {
                    if (result) {
                         queryExpress.push({
                              categories: result._id
                         })
                    }
                    console.log(queryExpress);



                    // begin to search
                    async.parallel([
                         function(callback) {
                              Charities.count({
                                   $or: queryExpress
                              }, (err, count) => {
                                   callback(err, count);
                              })
                         },
                         function(callback) {
                              Charities.find({
                                        $or: queryExpress
                                   })
                                   .limit(perPage)
                                   .skip(perPage * page)
                                   .populate('categories')
                                   .exec((err, charities) => {
                                        if (err) return next(err);
                                        callback(err, charities);
                                   })
                         }
                    ], (err, results) => {
                         var totalNumber = results[0];
                         var charities = results[1];
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              success: true,
                              message: 'charities for' + query,
                              search_result: charities,
                              search_key: query,
                              totalNumber: totalNumber,
                              page: Math.ceil(totalNumber / perPage),
                              numberPerPage: perPage
                         }), (err) => next(err)
                    })
               })
     })
module.exports = searchRouter;
