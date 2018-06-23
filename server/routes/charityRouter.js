const express = require('express');
const bodyParser = require('body-parser');

const Charities = require('../models/charities');

const charityRouter = express.Router();

charityRouter.use(bodyParser.json());

charityRouter.route('/')
.get((req, res, next) => {
     Charities.find({})
     .then((charities) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(charities);
     }, (err) => next(err))
     .catch((err) => next(err));
})
.post((req, res, next) => {
     Charities.create(req.body)
     .then((charity) => {
          console.log("Charity created: ", charity);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(charity);
     }, (err) => next(err))
     .catch(err => next(err));
})
.put((req, res, next) => {
     res.statusCode = 403;
     res.end('PUT is not supported on endpoint /charities');
})
.delete((req, res, next) => {
     Charities.remove({})
          .then((resp) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(resp);
          }, (err)=> next(err))
          .catch(err => next(err));
});

charityRouter.route('/:charityId')
.get((req, res, next) =>{
     Charities.findById(req.params.charityId)
     .then((charity) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(charity);
     }, err => next(err))
     .catch(err => next(err));
})
.post((req, res, next) => {
     res.statusCode = 403;
     res.end('POST is not supported in this endpoint /charities' + req.params.charityId);
})
.put((req, res, next) => {
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
.delete((req, res, next) => {
     Charities.findByIdAndRemove(req.params.charityId)
          .then((resp) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(resp);
          }, (err) => next(err))
          .catch(err => next(err));
});

module.exports = charityRouter;
