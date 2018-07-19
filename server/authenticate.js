var passport = require('passport');
var LocalUserStrategy = require('passport-local').Strategy;
var User = require('./models/users');
const CharityRegister = require('./models/charityRegisters');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');// used to create, sign, and varify tockens

var config = require('./config');

// LocalStrategy configure strategy
// User.authenticate concrete verify/authenticate function
exports.local = passport.use('localUser',new LocalUserStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
     return jwt.sign(user, config.secretKey, {
          expiresIn: 180000
     }); // expire in 50 hour
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

// config jwt strategy and provide verification function
exports.jwtPassportUser = passport.use('jwtPassportUser', new JwtStrategy(opts,
     // verify function, done is return callback
     (jwt_payload, done) => {
          console.log('JWT payload: ', jwt_payload);
          User.findOne({_id: jwt_payload._id}, (err, user) => {
               if(err) {
                    // err user? info?
                    return done(err, false);
               }else if(user){
                    return done(null, user);
               }else{
                    return done(null, false);
               }
          });
     }));
// use of authentication
exports.verifyUser = passport.authenticate('jwtPassportUser', {session: false});
