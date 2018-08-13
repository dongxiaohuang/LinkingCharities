const express = require('express');
const bodyParser = require('body-parser');

const Ratings = require('../models/ratings');
const cors = require('./cors');
var authenticate = require('../authenticate');
const ratingRouter = express.Router();


ratingRouter.use(bodyParser.json());

ratingRouter.route('/:charityId')
.options(cors.corsWithOptions, (req, res) => {
     res.sendStatus(200);
})
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
     Ratings.findOne({
          charity:req.params.charityId,
          user: req.user._id
     })
     .then((result) => {
          if(result){
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    exists:true,
                    rating: result.rating
               });
          }else{
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    exists:false,
                    rating: null
               });
          }
     }, err => next(err))
     .catch(err => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
     Ratings.findOne({charity:req.params.charityId,
     user:req.user._id})
     .then(result => {
          if(!result){
               Ratings.create({
                    charity:req.params.charityId,
                    user:req.user._id,
                    rating: req.body.rating
               })
               .then(newresult => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(
                         {exists: false,result:newresult});
               }, err => next(err))
               .catch(err => next(err))
          }else{
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(
                    {exists: true,result:result});
          }
     })

})

ratingRouter.route('/:charityId/averageRating')
.options(cors.corsWithOptions, (req, res) => {
     res.sendStatus(200);
})
.get(cors.cors, (req, res, next) => {
     Ratings.aggregate(

          [{
               $group:{
                    _id: '$charity',
                    avgRating:{$avg: "$rating"},
                    count:{$sum:1}
               }
          }]
     )
     .then(result => {
          result = result.filter(rating => rating._id == req.params.charityId)[0]
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
     }, err => next(err))
     .catch(err => next(err))
})


module.exports = ratingRouter;
