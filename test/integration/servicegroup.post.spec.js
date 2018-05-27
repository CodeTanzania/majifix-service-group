'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { ServiceGroup } = require(path.join(__dirname, '..', '..'));

describe('ServiceGroup', function () {

  let jurisdiction;

  before(function (done) {
    Jurisdiction.remove(done);
  });

  before(function (done) {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post(function (error, created) {
      jurisdiction = created;
      done(error, created);
    });
  });

  before(function (done) {
    ServiceGroup.remove(done);
  });

  describe('static post', function () {

    let servicegroup;

    it('should be able to post', function (done) {

      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;

      ServiceGroup
        .post(servicegroup, function (error, created) {
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

  describe('instance post', function () {

    let servicegroup;

    it('should be able to post', function (done) {

      servicegroup = ServiceGroup.fake();

      servicegroup
        .post(function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(servicegroup._id);
          expect(created.name).to.eql(servicegroup.name);
          expect(created.code).to.eql(servicegroup.code);
          done(error, created);
        });
    });

  });

  after(function (done) {
    ServiceGroup.remove(done);
  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});