'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('majifix-jurisdiction');
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

  describe('static patch', function () {

    let servicegroup;

    before(function (done) {
      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;
      servicegroup
        .post(function (error, created) {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to patch', function (done) {

      servicegroup = servicegroup.fakeOnly('name');

      ServiceGroup
        .patch(servicegroup._id, servicegroup, function (error,
          updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(servicegroup._id);
          expect(updated.name.en).to.eql(servicegroup.name.en);

          //assert jurisdiction
          expect(updated.jurisdiction).to.exist;
          expect(updated.jurisdiction.code)
            .to.eql(servicegroup.jurisdiction.code);
          expect(updated.jurisdiction.name)
            .to.eql(servicegroup.jurisdiction.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {

      const fake = ServiceGroup.fake();

      ServiceGroup
        .patch(fake._id, fake, function (error, updated) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(updated).to.not.exist;
          done();
        });
    });

  });

  describe('instance patch', function () {

    let servicegroup;

    before(function (done) {
      servicegroup = ServiceGroup.fake();
      servicegroup
        .post(function (error, created) {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to patch', function (done) {
      servicegroup = servicegroup.fakeOnly('name');

      servicegroup
        .patch(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(servicegroup._id);
          expect(updated.name).to.eql(servicegroup.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {
      servicegroup
        .patch(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(servicegroup._id);
          done();
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