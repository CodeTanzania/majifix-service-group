'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { ServiceGroup } = require(path.join(__dirname, '..', '..'));

describe('ServiceGroup', function () {

  let jurisdiction;

  before(function (done) {
    Jurisdiction.deleteMany(done);
  });

  before(function (done) {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post(function (error, created) {
      jurisdiction = created;
      done(error, created);
    });
  });


  before(function (done) {
    ServiceGroup.deleteMany(done);
  });

  describe('get by id', function () {

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

    it('should be able to get an instance', function (done) {
      ServiceGroup
        .getById(servicegroup._id, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(servicegroup._id);

          //assert jurisdiction
          expect(found.jurisdiction).to.exist;
          expect(found.jurisdiction.code)
            .to.eql(servicegroup.jurisdiction.code);
          expect(found.jurisdiction.name)
            .to.eql(servicegroup.jurisdiction.name);
          done(error, found);
        });
    });

    it('should be able to get with options', function (done) {

      const options = {
        _id: servicegroup._id,
        select: 'code'
      };

      ServiceGroup
        .getById(options, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(servicegroup._id);
          expect(found.code).to.exist;

          //...assert selection
          const fields = _.keys(found.toObject());
          expect(fields).to.have.length(3);
          _.map([
            'name',
            'description',
            'color',
            'createdAt',
            'updatedAt'
          ], function (field) {
            expect(fields).to.not.include(field);
          });


          done(error, found);
        });

    });

    it('should throw if not exists', function (done) {
      const servicegroup = ServiceGroup.fake();

      ServiceGroup
        .getById(servicegroup._id, function (error, found) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(found).to.not.exist;
          done();
        });
    });

  });

  after(function (done) {
    ServiceGroup.deleteMany(done);
  });

  after(function (done) {
    Jurisdiction.deleteMany(done);
  });

});
