'use strict';

/**
 * This function seed  a collection of serviceGroups provided to it as the first
 *  argument.
 * @function
 * @param {Array|Object} serviceGroups - Service Group collection or object to seed
 * @param {Function} done - Callback when the function finished seeding data
 * @version 0.1.0
 * @since 0.1.0
 */

//  dependencies
const path = require('path');
const _ = require('lodash');
const Jurisdiction = require(path.join(__dirname, '..', 'models',
  'service_group'));

module.exports = function (serviceGroups, done) {

  serviceGroups = _.concat([], serviceGroups);

  Jurisdiction.create(serviceGroups, function (error, results) {

    if (error) {

      done(error);
    }

    done(null, results);
  });
};