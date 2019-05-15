'use strict';

const passport = require('../../middlewares/passport');
const { User } = require('../../models');

// eslint-disable-next-line consistent-return
const registration = async (ctx) => {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/profile');
  }
  const { email } = ctx.request.body;
  const userFromDB = await User.findOne({ where: { email } });

  if (!userFromDB) {
    await User.create(ctx.request.body);

    await passport.authenticate('local', {}, async (err, newUser) => {
      ctx.login(newUser, (err) => {
        if (err) {
          ctx.throw(401, err.message);
        }
        ctx.status = 200;
        ctx.body = newUser;
      });
    })(ctx);
  } else {
    ctx.throw(401, 'This email has been used for registration. Please use another email.');
  }
};

// eslint-disable-next-line consistent-return
const login = async (ctx) => {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/profile');
  }

  await passport.authenticate('local', {}, async (err, user) => {
    if (!user) {
      ctx.throw(401, 'Incorrect login/password');
    }

    ctx.login(user, (err) => {
      if (err) {
        ctx.throw(401, err.message);
      }
      ctx.status = 200;
      ctx.body = user;
    });
  })(ctx);
};

const logout = async (ctx) => {
  await ctx.logout();
  ctx.status = 200;

  return ctx.redirect('/home');
};

const getCurrentUser = (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.throw(401, 'Unauthenticated');
  }
  ctx.status = 200;
  ctx.body = ctx.state.user;
};

module.exports = {
  getCurrentUser,
  login,
  logout,
  registration,
};
