'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
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

  describe('get by id', () => {

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

    it('should be able to get an instance', done => {
      ServiceGroup
        .getById(servicegroup._id, (error, found) => {
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

    it('should be able to get with options', done => {

      const options = {
        _id: servicegroup._id,
        select: 'code'
      };

      ServiceGroup
        .getById(options, (error, found) => {
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
          ], field => {
            expect(fields).to.not.include(field);
          });


          done(error, found);
        });

    });

    it('should throw if not exists', done => {
      const servicegroup = ServiceGroup.fake();

      ServiceGroup
        .getById(servicegroup._id, (error, found) => {
          expect(error).to.exist;
          // expect(error.status).to.exist;
          expect(error.name).to.be.equal('DocumentNotFoundError');
          expect(found).to.not.exist;
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
