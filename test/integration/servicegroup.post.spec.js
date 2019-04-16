'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { ServiceGroup } = require(path.join(__dirname, '..', '..'));

describe('ServiceGroup', () => {

  let jurisdiction;

  before(done => {
    Jurisdiction.deleteMany(done);
  });

  before(done => {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post((error, created) => {
      jurisdiction = created;
      done(error, created);
    });
  });

  before(done => {
    ServiceGroup.deleteMany(done);
  });

  describe('static post', () => {

    let servicegroup;

    it('should be able to post', done => {

      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;

      ServiceGroup
        .post(servicegroup, (error, created) => {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(servicegroup._id);
          expect(created.name.en).to.eql(servicegroup.name.en);
          expect(created.code).to.eql(servicegroup.code);

          //assert jurisdiction
          expect(created.jurisdiction).to.exist;
          expect(created.jurisdiction.code)
            .to.eql(servicegroup.jurisdiction.code);
          expect(created.jurisdiction.name)
            .to.eql(servicegroup.jurisdiction.name);
          done(error, created);
        });
    });

  });

  describe('instance post', () => {

    let servicegroup;

    it('should be able to post', done => {

      servicegroup = ServiceGroup.fake();

      servicegroup
        .post((error, created) => {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(servicegroup._id);
          expect(created.name).to.eql(servicegroup.name);
          expect(created.code).to.eql(servicegroup.code);
          done(error, created);
        });
    });

  });

  after(done => {
    ServiceGroup.deleteMany(done);
  });

  after(done => {
    Jurisdiction.deleteMany(done);
  });

});
