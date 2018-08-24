const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const Volunteers = require('../models/volunteers');
const CharityRegisters = require('../models/charityRegisters');
const Timeslots = require('../models/timeslots');
const cors = require('./cors');
var charityAuthenticate = require('../charityAuthenticate');
var authenticate = require('../authenticate');
var moment = require('moment')

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
let date = new Date(yyyy, mm, dd);
let timestamp = date.getTime();

const volunteerRouter = express.Router();

volunteerRouter.use(bodyParser.json());

volunteerRouter.route('/')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          var perPage = 10;
          var page = req.query.page;
          var year = req.query.year;
          var month = req.query.month;
          var day = req.query.day;
          let timeslots;
          async.parallel([
               (callback) => {
                    if (year || month || day) {
                         Timeslots.find({
                                   'date.year': year,
                                   'date.month': month,
                                   'date.day': day
                              })
                              .then(results => {
                                   let timeslotsId = results.map(result =>
                                        result._id
                                   )
                                   console.log(timeslotsId)
                                   Volunteers.count({
                                             timeslots: {
                                                  $in: timeslotsId
                                             }
                                        })
                                        .then(res => {
                                             callback(null, res)
                                        })
                                        .catch(err => callback(err, null))

                              })
                    } else {
                         // console.log(yyyy, mm, dd);
                         Timeslots.find({
                                   dateTimestamp: {
                                        $gte: timestamp
                                   }
                              })
                              .then(results => {
                                   let timeslotsIds = results.map(result =>
                                        result._id
                                   )
                                   Volunteers.count({
                                             timeslots: {
                                                  $in: timeslotsIds
                                             }
                                        })
                                        .then(res => {
                                             callback(null, res)
                                        })
                                        .catch(err => callback(err, null))
                              })
                    }
               },
               callback => {
                    if (year || month || day) {
                         Timeslots.find({
                                   'date.year': year,
                                   'date.month': month,
                                   'date.day': day
                              })
                              .then(results => {
                                   let timeslotsId = results.map(result =>
                                        result._id
                                   )
                                   console.log(timeslotsId)
                                   Volunteers.find({
                                             timeslots: {
                                                  $in: timeslotsId
                                             }
                                        })
                                        .limit(perPage)
                                        .skip(perPage * page)
                                        .populate('charity')
                                        .populate('timeslots')
                                        .then(res => {
                                             callback(null, res)
                                        })
                                        .catch(err => callback(err, null))

                              })
                    } else {
                         console.log(yyyy, mm, dd);
                         Timeslots.find({
                                   dateTimestamp: {
                                        $gte: timestamp
                                   }
                              })
                              .then(results => {
                                   let timeslotsId = results.map(result =>
                                        result._id
                                   )
                                   Volunteers.find({
                                             timeslots: {
                                                  $in: timeslotsId
                                             }
                                        })
                                        .limit(perPage)
                                        .skip(perPage * page)
                                        .populate('charity')
                                        .populate('timeslots')
                                        .then(res => {
                                             callback(null, res)
                                        })
                                        .catch(err => callback(err, null))
                              })
                    }
               }
          ], (err, results) => {
               var totalNumber = results[0];
               var volunteers = results[1];
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    success: true,
                    message: 'charities',
                    volunteers: volunteers,
                    totalNumber: totalNumber,
                    page: Math.ceil(totalNumber / perPage),
                    numberPerPage: perPage
               }), (err) => next(err)
          })
     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          CharityRegisters.findById(req.user._id)
               .then(charityUser => {
                    let volunteer = req.body;
                    volunteer.charity = charityUser.charity;
                    Volunteers.create(volunteer)
                         .then(vol => {
                              res.statusCode = 200;
                              res.setHeader('Content-Type', 'application/json');
                              res.json(vol)
                         }, err => next(err))
                         .catch(err => next(err))
               }, err => next(err))
               .catch(err => next(err))
     })
     .put(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('PUT is not supported in this endpoint /volunteer');
     })
     .delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('DELETE is not supported in this endpoint /volunteer');
     })

volunteerRouter.route('/:volunteerId')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          Volunteers.findById(req.params.volunteerId)
               .populate('charity')
               .populate('timeslots')
               .then(volunteer => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(volunteer)
               }, err => next(err))
               .catch(err => next(err))
     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('POST is not supported in this endpoint /volunteer' + req.params.volunteerId);
     })
     .put(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          Volunteers.findByIdAndUpdate(req.params.volunteerId, {
                    $set: req.body
               }, {
                    new: true
               })
               .then((volunteer) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(volunteer);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          Volunteers.findByIdAndRemove(req.params.volunteerId)
               .then(resp => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
               }, (err) => next(err))
               .catch(err => next(err));
     })

volunteerRouter.route('/:volunteerId/timeslots')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          Volunteers.findById(req.params.volunteerId)
               .populate('timeslots')
               .then(volunteer => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(volunteer.timeslots);
               }, err => next(err))
               .catch(err => next(err))
     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          let timeslotId;
          Timeslots.create(req.body)
               .then(timeslot => {
                    if(timeslot instanceof Array)
                    { timeslotId = timeslot.map(timeslot => timeslot._id.toString())}
                    else{
                         timeslotId = timeslot._id;
                    }
                    console.log(timeslotId)
                    Volunteers.findById(req.params.volunteerId)
                         .then(volunteer => {
                              if(timeslotId instanceof Array)
                              {volunteer.timeslots = volunteer.timeslots.concat(timeslotId)}
                              else {volunteer.timeslots.push(timeslotId);}
                              console.log(volunteer.timeslots)
                              volunteer.save()
                                   .then((volunteer) => {
                                        Volunteers.findById(volunteer._id)
                                             .populate('timeslots')
                                             .then(volunteer => {
                                                  res.statusCode = 200;
                                                  res.setHeader('Content-Type', 'application/json');
                                                  res.json({
                                                       success: true,
                                                       message:"add timeslot successfully",
                                                       results: volunteer.timeslots
                                                  });
                                             }, err => next(err))
                                             .catch(err => next(err))
                                   }, err => next(err))
                         }, err => next(err))
                         .catch(err => next(err))
               }, err => next(err))
               .catch(err => next(err))

     })
     .put(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('PUT is not supported in this endpoint /volunteer' + req.params.volunteerId);
     })
     .delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          Volunteers.findById(req.params.volunteerId)
               .then(volunteer => {
                    volunteer.timeslots = [];
                    volunteer.save()
                         .then((volunteer) => {
                                   res.statusCode = 200;
                                   res.setHeader('Content-Type', 'application/json');
                                   res.json(volunteer);
                         }, err => next(err))
               }, err => next(err))
               .catch(err => next(err))
     })

volunteerRouter.route('/:volunteerId/timeslot/:timeslotId')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          Timeslots.findById(req.params.timeslotId)
               .then(timeslot => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(timeslot);
               }, err => next(err))
               .catch(err => next(err))
     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('POST is not supported in this endpoint /volunteer' + req.params.volunteerId + '/timeslot/' + req.params.timeslotId);
     })
     //Method not allowed (405) &Update the time slot with id:timeslotId for the voluntary activity with id:volunteerId
     .put(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          Timeslots.findByIdAndUpdate(req.params.timeslotId, {
                    $set: req.body
               }, {
                    new: true
               })
               .then(result => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(result);
               }, err => next(err))
               .catch(err => next(err))
     })
     //Delete the time slot with id:timeslotId for the voluntary activity with id:volunteerId
     .delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          Timeslots.findByIdAndRemove(req.params.timeslotId)
               .then(resp => {
                    Volunteers.findById(req.params.volunteerId)
                         .then(volunteer => {
                              let idx = volunteer.timeslots.indexOf(req.params.timeslotId);
                              if (idx != -1) {
                                   volunteer.timeslots.splice(idx, 1);
                              }
                              volunteer.save()
                                   .then(resp => {
                                        Volunteers.findById(req.params.volunteerId)
                                        .populate('timeslots')
                                        .then(volunteer => {
                                             res.statusCode = 200;
                                             res.setHeader('Content-Type', 'application/json');
                                             res.json(volunteer);
                                        })
                                   }, err => next(err))
                                   .catch(err => next(err))
                         })
               }, err => next(err))
               .catch(err => next(err))
     })

// get the volunteer activities registers
volunteerRouter.route('/:volunteerId/timeslots/getregisters')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, charityAuthenticate.verifyUser, (req, res, next) => {
          CharityRegisters.findById(req.user._id)
               .then(charityUser => {
                    Volunteers.find({
                              _id: req.params.volunteerId,
                              charity: charityUser.charity
                         })
                         .populate('timeslots')
                         .deepPopulate(['timeslots.registers'])
                         .then((volunteers) => {
                              // if (volunteer != null && volunteer.timeslots.id(req.params.timeslotId) != null) {
                              res.statusCode = 200;
                              res.setHeader('Content-Type', 'application/json');
                              res.json({
                                   success: true,
                                   message: 'registers found for this activity',
                                   results: volunteers
                              })
                         }, (err) => next(err))
                         .catch((err) => next(err));
               }, err => next(err))
               .catch(err => next(err))
     });
// get all the volunteer activities that registered by user
volunteerRouter.route('/user/volunteers')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
          Timeslots.find({
                    registers: req.user._id
               })
               .then(timeslots => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(timeslots)
               })
     });

//register to volunteer activities
volunteerRouter.route('/:volunteerId/timeslot/:timeslotId/register')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
          Timeslots.findById(req.params.timeslotId)
               .then(timeslot => {
                    let idx = timeslot.registers.indexOf(req.user._id);
                    if (idx != -1) {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         return res.json({
                              "exists": true,
                              "timeslot": timeslot
                         });
                    } else {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         return res.json({
                              "exists": false,
                              "timeslot": timeslot
                         });
                    }
               }, err => next(err))
               .catch(err => next(err))
     })
     .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          Timeslots.findById(req.params.timeslotId)
               .then(timeslot => {
                    if(!timeslot){
                         err = new Error('timeslot ' + req.params.timeslotId + ' not found');
                         err.status = 404;
                         return next(err);
                    }
                    let idx = timeslot.registers.indexOf(req.user._id);
                    if (idx != -1) {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         return res.json({
                              success: true,
                              status: 'already registered successful',
                              result: timeslot
                         });
                    } else {
                         let register_no = timeslot.registers.length;
                         let allow_no = timeslot.requiredNumber;
                         if (register_no >= allow_no) {
                              res.statusCode = 405;
                              res.setHeader('Content-Type', 'application/json');
                              return res.json({
                                   success: false,
                                   status: 'register failed',
                                   err: 'The amount of people registered is full'
                              });
                         } else {
                              timeslot.registers.push(req.user._id);
                                   timeslot.save()
                                   .then(resp => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json({
                                             success: true,
                                             status: 'register successful',
                                             result: resp
                                        });
                                   }, err => next(err))
                                   .catch(err => next(err))
                         }
                    }
               }, err => next(err))
               .catch(err => next(err))
     })
     .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'text/html');
          res.end(req.method + " not supported!");
     })
     .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
          Timeslots.findById(req.params.timeslotId)
               .then(timeslot => {
                    if (!timeslot) {
                         err = new Error('timeslot ' + req.params.timeslotId + ' not found');
                         err.status = 404;
                         return next(err);
                    }
                    let idx = timeslot.registers.indexOf(req.user._id);
                    if (idx != -1) {
                         timeslot.registers.splice(idx, 1);
                         timeslot.save()
                              .then(resp => {
                                   res.statusCode = 200;
                                   res.setHeader('Content-Type', 'application/json');
                                   res.json({
                                        success: true,
                                        status: 'unregister successful',
                                        result: resp
                                   });
                              }, err => next(err))
                    } else {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              success: true,
                              status: 'unregister successful, not registered before',
                              result: timeslot
                         });
                    }
               }, err => next(err))
               .catch(err => next(err))
     })


// get volunteers activities that availeble from now
volunteerRouter.route('/charity/:charityId')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          var perPage = 10;
          var page = req.query.page;
          async.parallel([
               (callback) => {
                    Timeslots.find({
                              dateTimestamp: {
                                   $gte: timestamp
                              }
                         })
                         .then(results => {
                              let timeslotsIds = results.map(result =>
                                   result._id
                              )
                              Volunteers.count({
                                        $and: [{
                                             charity: req.params.charityId
                                        }, {
                                             timeslots: {
                                                  $in: timeslotsIds
                                             }
                                        }]
                                   })
                                   .then(res => {
                                        callback(null, res)
                                   })
                                   .catch(err => next(err, null))
                         })
               },
               callback => {
                    Timeslots.find({
                              dateTimestamp: {
                                   $gte: timestamp
                              }
                         })
                         .then(results => {
                              let timeslotsIds = results.map(result =>
                                   result._id
                              )
                              Volunteers.find({
                                        $and: [{
                                             charity: req.params.charityId
                                        }, {
                                             timeslots: {
                                                  $in: timeslotsIds
                                             }
                                        }]
                                   })
                                   .limit(perPage)
                                   .skip(perPage * page)
                                   .sort('-createdAt')
                                   .then((res) => callback(null, res))
                                   .catch(err => callback(err, null))
                         })

               }
          ], (err, results) => {
               var totalNumber = results[0];
               var volunteers = results[1];
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                    success: true,
                    message: 'volunteer for ' + req.params.charityId,
                    volunteers: volunteers,
                    totalNumber: totalNumber,
                    page: Math.ceil(totalNumber / perPage),
                    numberPerPage: perPage
               }), (err) => next(err)
          })
     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('POST is not supported in this endpoint /charity/' + req.params.charityId);
     })
     .put(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('PUT is not supported in this endpoint /charity/' + req.params.charityId);
     })
     .delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('DELETE is not supported in this endpoint /charity/' + req.params.charityId);
     })
// get all charity registered volunteer activities
volunteerRouter.route('/charity/activities/all')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, charityAuthenticate.verifyUser, (req, res, next) => {
          CharityRegisters.findById(req.user._id)
               .then(charityUser => {
                    var perPage = 10;
                    var page = req.query.page;
                    // console.log(charityUser)
                    let user = charityUser
                    async.parallel([
                         (callback) => {
                              Volunteers.count({
                                        charity: user.charity
                                   })
                                   .then(res => {
                                        callback(null, res)
                                   })
                                   .catch(err => callback(err, null))
                         },
                         callback => {
                              Volunteers.find({
                                        charity: user.charity
                                   })
                                   .limit(perPage)
                                   .skip(perPage * page)
                                   .sort('-createdAt')
                                   .populate('timeslots')
                                   .then((res) => callback(null, res))
                                   .catch(err => callback(err, null))
                         }
                    ], (err, results) => {
                         var totalNumber = results[0];
                         var volunteers = results[1];
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json({
                              success: true,
                              message: 'load all volunteer activities for ' + user.charity,
                              volunteers: volunteers,
                              totalNumber: totalNumber,
                              page: Math.ceil(totalNumber / perPage),
                              numberPerPage: perPage
                         }), (err) => next(err)
                    })
               })
               .catch(err => next(err))


     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('POST is not supported in this endpoint /charity/' + '/allactivities');
     })
     .put(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('PUT is not supported in this endpoint /charity/' + '/allactivities');
     })
     .delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 405;
          res.end('DELETE is not supported in this endpoint /charity/' + '/allactivities');
     })


module.exports = volunteerRouter;
