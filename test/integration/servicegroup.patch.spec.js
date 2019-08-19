import _ from 'lodash';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { create, clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup } from '../../src';

describe('ServiceGroup', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, ServiceGroup, done));

  before(done => create(jurisdiction, done));

  describe('static patch', () => {
    let servicegroup;

    before(done => {
      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;
      create(servicegroup, done);
    });

    it('should be able to patch', done => {
      servicegroup = servicegroup.fakeOnly('name');

      ServiceGroup.patch(servicegroup._id, servicegroup, (error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(servicegroup._id);
        expect(updated.name.en).to.eql(servicegroup.name.en);

        // assert jurisdiction
        expect(updated.jurisdiction).to.exist;
        expect(updated.jurisdiction.code).to.eql(
          servicegroup.jurisdiction.code
        );
        expect(updated.jurisdiction.name).to.eql(
          servicegroup.jurisdiction.name
        );
        done(error, updated);
      });
    });

    it('should throw if not exists', done => {
      const fake = ServiceGroup.fake().toObject();

      ServiceGroup.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(updated).to.not.exist;
        done();
      });
    });
  });

  describe('instance patch', () => {
    let servicegroup;

    before(done => {
      servicegroup = ServiceGroup.fake();
      servicegroup.post((error, created) => {
        servicegroup = created;
        done(error, created);
      });
    });

    it('should be able to patch', done => {
      servicegroup = servicegroup.fakeOnly('name');

      servicegroup.patch((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(servicegroup._id);
        expect(updated.name).to.eql(servicegroup.name);
        done(error, updated);
      });
    });

    it('should throw if not exists', done => {
      servicegroup.patch((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(servicegroup._id);
        done();
      });
    });
  });

  after(done => clear('Jurisdiction', 'ServiceGroup', done));
});
