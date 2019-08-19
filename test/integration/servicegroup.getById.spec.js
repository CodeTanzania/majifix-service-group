import _ from 'lodash';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { create, clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup } from '../../src';

describe('ServiceGroup', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, ServiceGroup, done));

  before(done => create(jurisdiction, done));

  describe('get by id', () => {
    let servicegroup;

    before(done => {
      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;
      create(servicegroup, done);
    });

    it('should be able to get an instance', done => {
      ServiceGroup.getById(servicegroup._id, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(servicegroup._id);

        // assert jurisdiction
        expect(found.jurisdiction).to.exist;
        expect(found.jurisdiction.code).to.eql(servicegroup.jurisdiction.code);
        expect(found.jurisdiction.name).to.eql(servicegroup.jurisdiction.name);
        done(error, found);
      });
    });

    it('should be able to get with options', done => {
      const options = {
        _id: servicegroup._id,
        select: 'code',
      };

      ServiceGroup.getById(options, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(servicegroup._id);
        expect(found.code).to.exist;

        // ...assert selection
        const fields = _.keys(found.toObject());
        expect(fields).to.have.length(3);
        _.map(
          ['name', 'description', 'color', 'createdAt', 'updatedAt'],
          field => {
            expect(fields).to.not.include(field);
          }
        );

        done(error, found);
      });
    });

    it('should throw if not exists', done => {
      const fake = ServiceGroup.fake();

      ServiceGroup.getById(fake._id, (error, found) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(found).to.not.exist;
        done();
      });
    });
  });

  after(done => clear('Jurisdiction', 'ServiceGroup', done));
});
