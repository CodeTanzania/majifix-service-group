const _ = require('lodash');
const { waterfall } = require('async');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { ServiceGroup } = require('../lib');

/* track seeding time */
let seedStart;
let seedEnd;

const log = (stage, error, results) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }

  if (results) {
    const val = _.isArray(results) ? results.length : results;
    console.info(`${stage} seed result`, val);
  }
};

const clearSeed = next => clear(ServiceGroup, Jurisdiction, () => next());

const seedJurisdiction = next => Jurisdiction.fake().post(next);

const seedServiceGroup = (jurisdiction, next) => {
  let serviceGroups = ServiceGroup.fake(50);

  serviceGroups = _.forEach(serviceGroups, group => {
    group.set({ jurisdiction });
    return group;
  });

  ServiceGroup.create(serviceGroups, next);
};

const seed = () => {
  seedEnd = Date.now();
  waterfall(
    [clearSeed, seedJurisdiction, seedServiceGroup],
    (error, results) => {
      if (error) {
        throw error;
      }
      seedEnd = Date.now();

      log('time', null, seedEnd - seedStart);
      log('final', error, results);
      process.exit(0);
    }
  );
};

// connect and seed
connect(error => {
  if (error) {
    throw error;
  }
  seed();
});
