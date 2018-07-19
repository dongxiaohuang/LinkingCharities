const express = require('express');
const bodyParser = require('body-parser');
const cardRouter = express.Router();
const PaymentDetail = require('../models/payment_details');
const cors = require('./cors');

cardRouter.use(bodyParser.json());

cardRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200);})
.get(cors.corsWithOptions, (req, res, next) => {
     res.statusCode = 403;
     res.end('GET is not supported on endpoint /categories');
})
.post(cors.corsWithOptions, (req, res, next) => {
     PaymentDetail.create(req.body)
          .then((pt) => {
               res.statusCode = 200;
               res.setHeader('Content-Type','application/json');
               res.json({
                    success: true,
                    message: "payment details added successfully",
                    details: pt
               });
          }, err => next(err))
          .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
     res.statusCode = 403;
     res.end('PUT is not supported on endpoint /categories');
})
.delete(cors.corsWithOptions, (req, res, next) => {
     res.statusCode = 403;
     res.end('DELETE is not supported on endpoint /categories');
})
module.exports = cardRouter;
