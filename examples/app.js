'use strict';

/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/majifix-service-group');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
// mongoose.set('debug', true);
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const {
  ServiceGroup,
  apiVersion,
  app,
  info
} = require(path.join(__dirname, '..'));
let samples = require('./samples')(20);


/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clear(next) {
      ServiceGroup.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clear(next) {
      Jurisdiction.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedJurisdiction(next) {
      const jurisdiction = Jurisdiction.fake();
      jurisdiction.post(next);
    },

    function seed(jurisdiction, next) {
      /* fake services groups*/
      samples =
        _.map(samples, function (sample, index) {
          if ((index % 2 === 0)) {
            sample.jurisdiction = jurisdiction;
          }
          return sample;
        });
      ServiceGroup.create(samples, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(
        `visit http://0.0.0.0:${env.PORT}/v${apiVersion}/servicegroups`
      );
    });

  });

}

boot();
