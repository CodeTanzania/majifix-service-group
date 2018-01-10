'use strict';
/**
 * Seed util specification
 */

const path = require('path');
const expect = require('chai').expect;
const faker = require('faker');
const seed = require(path.join(__dirname, '..', '..', '..', 'utils', 'seed'));

describe.skip('Seed function', () => {

  it('should export a function', () => {
    expect(seed).to.be.a('function');
  });

  it('should accept two arguments', () => {
    expect(seed.length).to.be.equal(2);
  });

  it('should be able to save one serviceGroup', (done) => {

    const serviceGroup = {
      name: faker.name.jobArea()
    };

    seed(serviceGroup, function (error, results) {
      expect(error).not.exist;
      expect(results).to.exist;
      expect(results).to.be.an('array');
      expect(results).to.have.lengthOf(1);
      done();
    });

  });

  it('should be able to save an array of serviceGroups', (done) => {

    const serviceGroups = [{
      name: faker.name.jobArea()
    }, {
      name: faker.name.jobArea()
    }];

    seed(serviceGroups, function (error, results) {
      expect(error).not.exist;
      expect(results).to.exist;
      expect(results).to.be.an('array');
      expect(results).to.have.lengthOf(serviceGroups.length);
      done();
    });
  });

  it('should  fail when serviceGroup name is empty', (done) => {
    const serviceGroup = {
      color: faker.random.alphaNumeric(6)
    };

    seed(serviceGroup, function (error, results) {
      expect(error).to.exist;
      expect(results).not.to.exist;
      done();
    });
  });
});