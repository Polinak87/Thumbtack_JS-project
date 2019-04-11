'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local');

const options = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, (email, password, done) => {
  // Fetch real user data from db and check if passed credentials match
  if (email === 'test@example.com' && password === 'password') {
    return done(null, {
      email,
      password,
      id: 1,
    });
  }

  return done(null, false);
}));

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  // Fetch real user data from db
  console.log('deserializeUser');
  done(null, {
    email: 'test@example.com',
    password: 'password',
    id: 1,
  });
});

module.exports = passport;
