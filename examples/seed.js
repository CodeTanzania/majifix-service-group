const _ = require('lodash');
const { waterfall } = require('async');
const { connect } = require('@lykmapipo/mongoose-common');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { ServiceGroup } = require('../lib');

/* track seeding time */
let seedStart;
let seedEnd;

/* eslint-disable */
const log = (stage, error, results) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }

  if (results) {
    const val = _.isArray(results) ? results.length : results;
    console.info(`${stage} seed result`, val);
  }
};
/* eslint-enable */

connect(err => {
  if (err) {
    throw err;
  }

  waterfall(
    [
      function clearJurisdiction(next) {
        Jurisdiction.deleteMany(() => next());
      },

      function clearServiceGroup(next) {
        ServiceGroup.deleteMany(() => next());
      },

      function seedJurisdiction(next) {
        const jurisdiction = Jurisdiction.fake();
        jurisdiction.post(next);
      },

      function seedServiceGroup(jurisdiction, next) {
        seedStart = Date.now;
        let serviceGroups = ServiceGroup.fake(50);

        serviceGroups = _.forEach(serviceGroups, group => {
          const sample = group;
          sample.jurisdiction = jurisdiction;
          return sample;
        });

        ServiceGroup.create(serviceGroups, next);
      },
    ],
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
});
