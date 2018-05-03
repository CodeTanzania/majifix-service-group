'use strict';

/* depedencies */
const _ = require('lodash');
const faker = require('faker');

function sample() {
  return {
    code: faker.finance.account(),
    name: faker.company.companyName(),
    description: faker.lorem.paragraph()
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};