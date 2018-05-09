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

  describe('static post', function () {

    let servicegroup;

    it('should be able to post', function (done) {

      servicegroup = ServiceGroup.fake();

      ServiceGroup
        .post(servicegroup, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(servicegroup._id);
          expect(created.name.en).to.eql(servicegroup.name.en);
          expect(created.code).to.eql(servicegroup.code);
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

});