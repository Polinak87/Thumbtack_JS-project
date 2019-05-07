'use strict';

module.exports = {
  development: {
    db: {
      name: 'thumbtack',
      username: 'root',
      password: 'root',
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      logging: true,
    },
  },
  test: {
    db: {
      name: 'thumbtack_test',
      username: 'root',
      password: 'root',
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      logging: false,
    },
  },
};

// module.exports = {
//   db,
// };
