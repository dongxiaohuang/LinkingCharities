var express = require('express');
var router = express.Router();
var cors = require('./cors')
const bodyParser = require('body-parser');
var User = require('../models/users');
// var passportLocalMongoose = require('passport-local-mongoose');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
     res.send('respond with a resource');
});

router.route('/signup')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.corsWithOptions, (req, res, next) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end("hell");
     })
     .post(cors.corsWithOptions, (req, res, next) => {
          User.findOne({
                    username: req.body.username
               })
               .then((user) => {
                    if (user != null) {
                         var err = new Error('User' + req.body.username + " already exists");
                         err.status = 403;
                         next(err);
                    } else {
                         return User.create({
                              username: req.body.username,
                              password: req.body.password
                         });
                    }
               })
               .then((user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                         status: "Registration successfully",
                         user: user
                    });
               }, (err) => next(err))
               .catch((err) => next(err));
     });
router.route('/login')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .post(cors.corsWithOptions, (req, res, next) => {
          User.findOne({
                    username: req.body.username
               })
               .then((user) => {
                    if (!user) {
                         var err = new Error('User' + req.body.username + " does not exists");
                         err.status = 403;
                         return next(err);
                    } else if (user.password != req.body.password) {
                         var err = new Error('password is incorrect!');
                         err.status = 403;
                         return next(err);
                    } else {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'text/plain');
                         res.end('You are authorised')
                    }
               }, (err) => next(err))
               .catch((err) => next(err));
     });

module.exports = router;
