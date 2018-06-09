'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require('@codetanzania/majifix-priority');
const { ServiceGroup } = require(path.join(__dirname, '..', '..'));

describe('ServiceGroup', function () {

  let jurisdiction;
  let priority;

  before(function (done) {
    Priority.remove(done);
  });

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
    priority = Priority.fake();
    priority.post(function (error, created) {
      priority = created;
      done(error, created);
    });
  });


  before(function (done) {
    ServiceGroup.remove(done);
  });

  describe('static delete', function () {

    let servicegroup;

    before(function (done) {
      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;
      servicegroup.priority = priority;
      servicegroup
        .post(function (error, created) {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      ServiceGroup
        .del(servicegroup._id, function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(servicegroup._id);

          //assert jurisdiction
          expect(deleted.jurisdiction).to.exist;
          expect(deleted.jurisdiction.code)
            .to.eql(servicegroup.jurisdiction.code);
          expect(deleted.jurisdiction.name)
            .to.eql(servicegroup.jurisdiction.name);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      ServiceGroup
        .del(servicegroup._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', function () {

    let servicegroup;

    before(function (done) {
      servicegroup = ServiceGroup.fake();
      servicegroup
        .post(function (error, created) {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      servicegroup
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(servicegroup._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      servicegroup
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(servicegroup._id);
          done();
        });
    });

  });

  after(function (done) {
    ServiceGroup.remove(done);
  });

  after(function (done) {
    Priority.remove(done);
  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});
