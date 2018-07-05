const express = require('express');
const bodyParser = require('body-parser');

const Charities = require('../models/charities');
const cors = require('./cors');
var authenticate = require('../authenticate');
const charityRouter = express.Router();

charityRouter.use(bodyParser.json());

charityRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
     Charities.find({})
     // .populate('comments.author') // overhead TODO: delete
     .then((charities) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(charities);
     }, (err) => next(err))
     .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
     Charities.create(req.body)
     .then((charity) => {
          console.log("Charity created: ", charity);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(charity);
     }, (err) => next(err))
     .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
     res.statusCode = 403;
     res.end('PUT is not supported on endpoint /charities');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
     Charities.remove({})
          .then((resp) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(resp);
          }, (err)=> next(err))
          .catch(err => next(err));
});

charityRouter.route('/:charityId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) =>{
     Charities.findById(req.params.charityId)
     .populate('comments.author')
     .then((charity) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(charity);
     }, err => next(err))
     .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
     res.statusCode = 403;
     res.end('POST is not supported in this endpoint /charities' + req.params.charityId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
     Charities.findByIdAndUpdate(req.params.charityId, {
          $set: req.body
     }, { new:true })
     .then((charity) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(charity);
     }, (err)=>next(err))
     .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
     Charities.findByIdAndRemove(req.params.charityId)
          .then((resp) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(resp);
          }, (err) => next(err))
          .catch(err => next(err));
});

module.exports = charityRouter;
