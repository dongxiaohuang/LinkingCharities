const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const cors = require('./cors');
const paymentRouter = express.Router();
const stripe = require('stripe')('sk_test_2nwposkyloGI8LEyP3FFZIlC');

paymentRouter.route('/')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .post(cors.corsWithOptions, (req, res, next) => {
          const stripeToken = req.body.stripeToken;
          const currentCharge = Math.round(req.body.amount * 100);

          stripe.customers
               .create({
                    source: stripeToken.id
               })
               .then(customer => {
                    return stripe.charges.create({
                         amount: currentCharge,
                         currency: 'gbp',
                         customer: customer.id
                    });
               })
               .then((charge) => {
                    // todo save
                    console.log('charge period')
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json({
                         success: true,
                         message: "Successfully made a payment"
                    })
               })
     })

module.exports = paymentRouter;
