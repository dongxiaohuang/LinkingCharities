var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');// used to create, sign, and varify tockens

var config = require('./config');

// LocalStrategy configure strategy
// User.authenticate concrete verify/authenticate function
exports.local = passport.use(new LocalStrategy(User.authenticate()));
//used for session
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
exports.jwtPassport = passport.use(new JwtStrategy(opts,
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
exports.verifyUser = passport.authenticate('jwt', {session: false});
