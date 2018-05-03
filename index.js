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
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
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
const app = require('@lykmapipo/express-common');


/* import models */
const ServiceGroup =
  require(path.join(__dirname, 'lib', 'servicegroup.model'));


/* import routers*/
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/* export servicegroup model */
exports.ServiceGroup = ServiceGroup;


/* export servicegroup router */
exports.router = router;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind servicegroup router */
    app.mount(router);
    return app;
  }

});