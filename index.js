'use strict';


/**
 * @name majifix-service-group
 * @description A representation of an entity that group service
 * offered by a jurisdiction(s) into meaningful categories e.g Sanitation.
 *
 * It provides a way to group several service request types
 * (issues) under meaningful categories such as Sanitation,
 * Commercial, Billing, Non-Commercial etc.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { app } = require('majifix-service-group');
 *
 * ...
 *
 * app.start();
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { app, mount } = require('@lykmapipo/express-common');


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];

/* extract information from package.json */
const info = _.merge({}, _.pick(pkg, fields));


/* import models */
const ServiceGroup =
  require(path.join(__dirname, 'lib', 'servicegroup.model'));

/* import routers*/
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/* export package(module) info */
exports.info = info;


/* export servicegroup model */
exports.ServiceGroup = ServiceGroup;


/* export servicegroup router */
exports.router = router;


/* export router api version */
exports.apiVersion = router.version;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind servicegroup router */
    mount(router);
    return app;
  }

});
