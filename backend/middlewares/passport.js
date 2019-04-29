'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local');

const {
  User,
} = require('../models');

const options = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, async (email, password, done) => {
  const user = await User.findOne({
    where: {
      email,
      password,
    },
  });

  if (user) {
    return done(null, {
      email,
      password,
      id: user.id,
    });
  }

  return done(null, false);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  done(null, {
    email: user.email,
    password: user.password,
    id: userId,
  });
});

module.exports = passport;
