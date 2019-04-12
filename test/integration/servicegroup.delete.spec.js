'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require('@codetanzania/majifix-priority');
const { ServiceGroup } = require(path.join(__dirname, '..', '..'));

describe('ServiceGroup', () => {

  let jurisdiction;
  let priority;

  before(done => {
    Priority.deleteMany(done);
  });

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
    priority = Priority.fake();
    priority.post((error, created) => {
      priority = created;
      done(error, created);
    });
  });


  before(done => {
    ServiceGroup.deleteMany(done);
  });

  describe('static delete', () => {

    let servicegroup;

    before(done => {
      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;
      servicegroup.priority = priority;
      servicegroup
        .post((error, created) => {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to delete', done => {
      ServiceGroup
        .del(servicegroup._id, (error, deleted) => {
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

    it('should throw if not exists', done => {
      ServiceGroup
        .del(servicegroup._id, (error, deleted) => {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', () => {

    let servicegroup;

    before(done => {
      servicegroup = ServiceGroup.fake();
      servicegroup
        .post((error, created) => {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to delete', done => {
      servicegroup
        .del((error, deleted) => {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(servicegroup._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', done => {
      servicegroup
        .del((error, deleted) => {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(servicegroup._id);
          done();
        });
    });

  });

  after(done => {
    ServiceGroup.deleteMany(done);
  });

  after(done => {
    Priority.deleteMany(done);
  });

  after(done => {
    Jurisdiction.deleteMany(done);
  });

});
