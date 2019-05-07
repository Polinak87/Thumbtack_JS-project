'use strict';

const { app } = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  app.context.log.info(`Server is started on ${PORT} port`);
});
