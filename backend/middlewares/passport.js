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
    const { firstName, lastName, id } = user;

    return done(null, {
      firstName,
      lastName,
      id,
    });
  }

  return done(null, false);
}));

passport.serializeUser((user, done) => {
  const { id } = user;

  done(null, id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  const { email, password } = user;

  done(null, {
    email,
    password,
    id: userId,
  });
});

module.exports = passport;
