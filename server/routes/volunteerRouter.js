const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const Volunteers = require('../models/volunteers');
const CharityRegisters = require('../models/charityRegisters');
const cors = require('./cors');
var charityAuthenticate = require('../charityAuthenticate');
var authenticate = require('../authenticate');
const volunteerRouter = express.Router();

volunteerRouter.use(bodyParser.json());

volunteerRouter.route('/')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          var perPage = 10;
          var page = req.body.page;
          async.parallel([
               (callback) => {
                    Volunteers.count({})
                         .then(res => {
                              callback(null, res)
                         })
                         .catch(err => callback(err, null))
               },
               callback => {
                    Volunteers.find({})
                         .limit(perPage)
                         .skip(perPage * page)
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
          res.statusCode = 403;
          res.end('PUT is not supported in this endpoint /volunteer');
     })
     .delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('DELETE is not supported in this endpoint /volunteer');
     })


volunteerRouter.route('/:volunteerId')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          Volunteers.findById(req.params.volunteerId)
               .then(volunteer => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(volunteer)
               }, err => next(err))
               .catch(err => next(err))
     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
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

volunteerRouter.route('/:volunteerId/timeslot')
     .options(cors.corsWithOptions, (req, res) => {
          res.sendStatus(200);
     })
     .get(cors.cors, (req, res, next) => {
          Volunteers.findById(req.params.volunteerId)
               .then(volunteer => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(volunteer.timeslots);
               }, err => next(err))
               .catch(err => next(err))
     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          Volunteers.findById(req.params.volunteerId)
               .then(volunteer => {
                    volunteer.timeslots.push(req.body);
                    volunteer.save()
                         .then((volunteer) => {
                              res.statusCode = 200;
                              res.setHeader('Content-Type', 'application/json');
                              res.json(volunteer);
                         }, err => next(err))
               }, err => next(err))
               .catch(err => next(err))
     })
     .put(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('PUT is not supported in this endpoint /volunteer' + req.params.volunteerId);
     })
     .delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          Volunteers.findById(req.params.volunteerId)
               .then(volunteer => {
                    volunteer.timeslots= [];
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
          Volunteers.findById(req.params.volunteerId)
               .then((volunteer) => {
                    if (volunteer != null && volunteer.timeslots.id(req.params.timeslotId) != null) {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json(volunteer.timeslots.id(req.params.timeslotId));
                    } else if (volunteer == null) {
                         err = new Error('volunteer ' + req.params.volunteerId + ' not found');
                         err.status = 404;
                         return next(err);
                    } else {
                         err = new Error('Timeslot ' + req.params.timeslotId + ' not found');
                         err.status = 404;
                         return next(err);
                    }
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
          res.statusCode = 403;
          res.end('POST is not supported in this endpoint /volunteer' + req.params.volunteerId + '/timeslot/' + req.params.timeslotId);
     })
     .put(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
               Volunteers.findOneAndUpdate({
                              "_id": req.params.volunteerId,
                              "timeslots._id": req.params.timeslotId
                         },
                         {"$set": {
                              "timeslots.$": req.body
                         }}, {
                              new: true
                         })
                    .then(volunteer => {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json(volunteer.timeslots.id(req.params.timeslotId));
                    }, err => next(err))
                    .catch(err => next(err))
     })
.delete(cors.corsWithOptions, charityAuthenticate.verifyUser, (req, res, next) => {
     Volunteers.findById(req.params.volunteerId)
          .then((volunteer) => {
               if (volunteer != null && volunteer.timeslots.id(req.params.timeslotId) != null) {
                    volunteer.timeslots.id(req.params.timeslotId).remove(); // make sure Id is different
                    volunteer.save()
                         .then(volunteer => {
                              res.statusCode = 200;
                              res.setHeader('Content-Type', 'application/json');
                              res.json(volunteer);
                         }, err => next(err))
                         .catch(err => next(err))
               } else if (volunteer == null) {
                    err = new Error('volunteer ' + req.params.volunteerId + ' not found');
                    err.status = 404;
                    return next(err);
               } else {
                    err = new Error('Timeslot ' + req.params.timeslotId + ' not found');
                    err.status = 404;
                    return next(err);
               }
          }, (err) => next(err))
          .catch((err) => next(err));
})

module.exports = volunteerRouter;
