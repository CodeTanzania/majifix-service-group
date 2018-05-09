'use strict';

/* dependencies */
const _ = require('lodash');
const faker = require('faker');

function sample() {
  return {
    code: faker.finance.account(),
    name: { en: faker.company.companyName(), sw: faker.company.companyName() },
    description: { en: faker.lorem.paragraph(), sw: faker.lorem.paragraph() }
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};