'use strict';

const multer = require('koa-multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploaded');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;

    cb(null, `${Date.now()}-${originalname}`);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
