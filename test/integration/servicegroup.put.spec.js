'use strict';

/* dependencies */
const path = require('path');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { ServiceGroup } = require(path.join(__dirname, '..', '..'));

describe('ServiceGroup', function () {

  before(function (done) {
    mongoose.connect('mongodb://localhost/majifix-servicegroup', done);
  });

  before(function (done) {
    ServiceGroup.remove(done);
  });

  describe('static put', function () {

    let servicegroup;

    before(function (done) {
      const fake = ServiceGroup.fake();
      fake
        .post(function (error, created) {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to put', function (done) {

      servicegroup = servicegroup.fakeOnly('name');

      ServiceGroup
        .put(servicegroup._id, servicegroup, function (error,
          updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(servicegroup._id);
          expect(updated.name).to.eql(servicegroup.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {

      const fake = ServiceGroup.fake();

      ServiceGroup
        .put(fake._id, fake, function (error, updated) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(updated).to.not.exist;
          done();
        });
    });

  });

  describe('instance put', function () {

    let servicegroup;

    before(function (done) {
      const fake = ServiceGroup.fake();
      fake
        .post(function (error, created) {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to put', function (done) {
      servicegroup = servicegroup.fakeOnly('name');

      servicegroup
        .put(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(servicegroup._id);
          expect(updated.name).to.eql(servicegroup.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {
      servicegroup
        .put(function (error, updated) {
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

});