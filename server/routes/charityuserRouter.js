const express = require('express');
const charityRegisterRouter = express.Router();
const bodyParser = require('body-parser');
const charityRegister = require('../models/charityRegisters');
const passport = require('passport');
const authenticate = require('../charityAuthenticate');
const cors = require('./cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken'); // used to create, sign, and varify tockens
const config = require('../config');
const charities = require('../models/charities');
const UKCharities = require('../models/ukcharities');

charityRegisterRouter.use(bodyParser.json());

charityRegisterRouter.route('/signup')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .post(cors.corsWithOptions, (req, res, next) => {
          charityRegister.register(
               new charityRegister({
                    username: req.body.username
               }), req.body.password,
               (err, charityUser) => {
                    if (err) {
                         res.statusCode = 500;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              success: false,
                              err: err
                         });
                    } else {
                         charityUser.firstname = req.body.firstname;
                         charityUser.lastname = req.body.lastname;
                         charityUser.charity = req.body.charity;
                         charityUser.save()
                              .then((charityUser) => {
                                   // if(0){
                                   //
                                   // }
                                   passport.authenticate('localCharity')(req, res, () => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json({
                                             status: "charityUser resgisteration successful!",
                                             success: true,
                                             userId:charityUser._id
                                        });
                                   })
                              }, err => next(err))
                              .catch(err => next(err))
                    }
               })
     });
charityRegisterRouter.route('/login')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .post(cors.corsWithOptions, (req, res, next) => {
          passport.authenticate('localCharity', (err, user, info) => {
               if (err) return next(err);
               if (!user) {
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                         success: false,
                         status: 'Charity Login Unsuccessful',
                         err: info
                    });
               } else {
                    // try to logIn
                    req.logIn(user, (err) => {
                         if (err) {
                              res.statusCode = 401;
                              res.setHeader('Content-Type', 'application/jsom');
                              res.json({
                                   success: false,
                                   status: "Charity Login Unsuccessful",
                                   err: "Could not login user"
                              });
                         };
                         var token = authenticate.getToken({
                              _id: req.user._id
                         }); // passport will provide user in header
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              status: "Charity Login successful!",
                              token: token,
                              success: true
                         });
                    })
               }
          })(req, res, next);
     });
charityRegisterRouter.route('/logout')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     //authenticate will automatically send error so we should only check req, res
     .get(cors.corsWithOptions, (req, res) => {
          req.logout();
          res.redirect('/');
     });
charityRegisterRouter.route('/profile')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          charityRegister.findById(req.user._id)
               .populate('charity')
               .deepPopulate(['charity.card', 'charity.categories'])
               .then((charityUser) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(charityUser);
               }, err => next(err))
               .catch(err => next(err))
     })
     .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('POST is not supported on endpoint /charityuser/profile');
     })
     .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          charityRegister.findByIdAndUpdate(req.user._id, {
                    $set: req.body
               }, {
                    new: true
               })
               .then(user => {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(user)
               }, err => next(err))
               .catch(err => next(err))
     })
     .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('DELETE is not supported on endpoint /charityuser/profile');
     })

charityRegisterRouter.route('/newpassword')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('GET is not supported on endpoint /charityuser/profile');
     })
     .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('POST is not supported on endpoint /charityuser/profile');
     })
     .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          charityRegister.findById(req.user._id).then(function(sanitizedUser) {
               if (sanitizedUser) {
                    sanitizedUser.setPassword(req.body.password, function() {
                         sanitizedUser.save();
                         res.status(200).json({
                              message: 'password reset successful'
                         });
                    });
               } else {
                    res.status(500).json({
                         message: 'This user does not exist'
                    });
               }
          }, function(err) {
               console.error(err);
          })
     })
     .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('DELETE is not supported on endpoint /charityuser/profile');
     })
// check token valid or not
//it will keep alive of user login info
charityRegisterRouter.route('/checkJWTToken')
     .options(cors.corsWithOptions, (req, res) => {
          sendStatus(200);
     })
     .get(cors.corsWithOptions, (req, res, next) => {
          passport.authenticate('jwt', {
               session: false
          }, (err, user, info) => {
               if (err) return next(err);
               if (!user) {
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({
                         status: 'JWT invalid',
                         success: false,
                         err: info
                    })
               } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({
                         status: 'JWT valid',
                         success: true,
                         user: user
                    });
               }
          })(req, res);
     })
charityRegisterRouter.route('/checkId')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .post(cors.corsWithOptions, (req, res, next) => {
          charityRegister.findOne({
                    username: req.body.username
               })
               .then(user => {
                    if (user) {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              exists: true
                         })
                    } else {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              exists: false
                         })
                    }
               }, err => next(err))
               .catch(err => next(err))

     })


charityRegisterRouter.route('/confirmation/:token')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          var decoded = jwt.verify(req.params.token, config.secretKey);
          if (!decoded._id) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    error: true,
                    msg: "Token is invalid, no valid information decoded!"
               })
          } else {
               charityRegister.findById(decoded._id)
                    .then(charity_user => {
                         if (!charity_user) {
                              res.statusCode = 200;
                              res.setHeader('Content-Type', 'application/json');
                              res.json({
                                   error: true,
                                   msg: "Token is invalid, no charity user found!"
                              })
                         } else {
                              charities.findById(charity_user.charity)
                                   .then(charity => {
                                        if (!charity) {
                                             res.statusCode = 200;
                                             res.setHeader('Content-Type', 'application/json');
                                             res.json({
                                                  error: true,
                                                  msg: 'no charity found!, please try again'
                                             })
                                        } else {
                                             charity.verified = true;
                                             charity.save()
                                                  .then(
                                                       charity => {
                                                            res.statusCode = 200;
                                                            res.setHeader('Content-Type', 'application/json');
                                                            res.json({
                                                                 error: false,
                                                                 msg: "charity.verified!"
                                                            })
                                                       }, err => next(err))
                                                  .catch(err => next(err))
                                                  .catch(err => next(err))
                                        }
                                   }, err => next(err))
                                   .catch(err => next(err))
                         }
                    })
          }
     })
charityRegisterRouter.route('/verification')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          let ccn = req.query.ccn;
          let charityuser = req.query.charityuser;
          if (!ccn || !charityuser) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    error: true,
                    msg: "no verification needed"
               })
          } else {
               console.log('charityuser', charityuser)
               jwt.sign({"_id":charityuser}, config.secretKey, {
                         expiresIn: 180000,
                    },
                    (err, emailToken) => {
                         console.log(emailToken)
                         //TODO: set to server url
                         const emailurl = `https://webcharity.azurewebsites.net/charityusers/confirmation/${emailToken}`;
                         // const emailurl = `http://localhost:8000/charityusers/confirmation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjZkYWMxNmUzZTYzMTUxZTYzZTNmZjQiLCJpYXQiOjE1MzY1NzI1MDYsImV4cCI6MTUzNjc1MjUwNn0.suctb0F6cuA8XLBBzPJMh3k1YC_SqjAT-q_yghDZxCE`;
                         UKCharities.findOne({
                                   regno: ccn
                              })
                              .then(charity => {
                                   if (!charity) {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json({
                                             error: true,
                                             msg: "no charity found in UK charity database"
                                        })
                                   } else {
                                        if (!charity.email) {
                                             res.statusCode = 200;
                                             res.setHeader('Content-Type', 'application/json');
                                             res.json({
                                                  error: true,
                                                  msg: "no charity found in UK charity database"
                                             })
                                        } else {
                                             let transporter = nodemailer.createTransport({
                                                  service: 'Gmail',
                                                  auth: {
                                                       user: config.gmail.user, // generated ethereal user
                                                       pass: config.gmail.psw // generated ethereal password
                                                  }
                                             });

                                             // setup email data with unicode symbol
                                             let mailOptions = {
                                                  from: '"LinkingCharities" <verify4linkingcharities@gmail.com>', // sender address
                                                  to: charity.email, // list of receivers
                                                  subject: 'Confirm Your Email for Linking Charities', // Subject line
                                                  text: 'Email confirmation', // plain text body
                                                  html: `Please click this email to confirm your email: <a href="${emailurl}">${emailurl}</a>`, // html body
                                             };

                                             // send mail with defined transport object
                                             transporter.sendMail(mailOptions, (error, info) => {
                                                  if (error) {
                                                       return console.log(error);
                                                  }
                                                  console.log('Message sent: %s', info.messageId);
                                                  // Preview only available when sending through an Ethereal account
                                                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                                                  res.statusCode = 200;
                                                  res.setHeader('Content-Type', 'application/json');
                                                  res.json({
                                                       error:false,
                                                       msg:'Message sent to email ' + charity.email
                                                  })
                                                  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                                                  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                                             });
                                        }
                                   }
                              })
                    },
               );
          }
     })
module.exports = charityRegisterRouter;
