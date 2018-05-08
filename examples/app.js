'use strict';

/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/majifix-servicegroup');


/* dependencies */
const path = require('path');
const async = require('async');
const mongoose = require('mongoose');
const { ServiceGroup, app, info } = require(path.join(__dirname, '..'));
const samples = require('./samples')(20);


/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clear(next) {
      ServiceGroup.remove(function ( /*error, results*/) {
        next();
      });
    },

    function seed(next) {
      /* fake servicegroups */
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
      console.log(`visit http://0.0.0.0:${env.PORT}/v${info.version}/servicegroups`);
    });

  });

}

boot();