const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const logger = require('./logger');

const configureMiddleware = (app) => {
  app.use(express.json());

  app.use(cookieParser());

  app.use(mongoSanitize());

  app.use(xssClean());

  app.use(
    expressRateLimit({
      windowMs: 10 * 60 * 1000,
      max: 100,
    }),
  );

  app.use(hpp());

  app.use(cors());

  // app.use(logger);
};

module.exports = configureMiddleware;
