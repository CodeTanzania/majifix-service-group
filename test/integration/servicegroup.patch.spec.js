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

  describe('static patch', () => {

    let servicegroup;

    before(done => {
      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;
      servicegroup
        .post((error, created) => {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to patch', done => {

      servicegroup = servicegroup.fakeOnly('name');

      ServiceGroup
        .patch(servicegroup._id, servicegroup, (error,
          updated) => {
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

    it('should throw if not exists', done => {

      const fake = ServiceGroup.fake();

      ServiceGroup
        .patch(fake._id, fake, (error, updated) => {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(updated).to.not.exist;
          done();
        });
    });

  });

  describe('instance patch', () => {

    let servicegroup;

    before(done => {
      servicegroup = ServiceGroup.fake();
      servicegroup
        .post((error, created) => {
          servicegroup = created;
          done(error, created);
        });
    });

    it('should be able to patch', done => {
      servicegroup = servicegroup.fakeOnly('name');

      servicegroup
        .patch((error, updated) => {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(servicegroup._id);
          expect(updated.name).to.eql(servicegroup.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', done => {
      servicegroup
        .patch((error, updated) => {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(servicegroup._id);
          done();
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
