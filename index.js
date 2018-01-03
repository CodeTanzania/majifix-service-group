'use strict';

/**
 * @module majifix service group
 * @version 0.1.0
 * @description majifix service group library
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @public
 */

let mongoose = require('mongoose');
const _ = require('lodash');

module.exports = function (options) {

  options = _.merge({}, options);

  mongoose = _.get(options, 'mongoose', mongoose);

  return {
    model: '',
    router: ''
  };
};