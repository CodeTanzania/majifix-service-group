import _ from 'lodash';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { create, clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup } from '../../src';

describe('ServiceGroup static put', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, ServiceGroup, done));

  before(done => create(jurisdiction, done));

  let servicegroup = ServiceGroup.fake();

  servicegroup.set({ jurisdiction });

  before(done => create(servicegroup, done));

  it('should be able to put', done => {
    servicegroup = servicegroup.fakeOnly('name');

    ServiceGroup.put(servicegroup._id, servicegroup, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(servicegroup._id);
      expect(updated.name.en).to.eql(servicegroup.name.en);

      // assert jurisdiction
      expect(updated.jurisdiction).to.exist;
      expect(updated.jurisdiction.code).to.eql(servicegroup.jurisdiction.code);
      expect(updated.jurisdiction.name).to.eql(servicegroup.jurisdiction.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = ServiceGroup.fake().toObject();

    ServiceGroup.put(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear(Jurisdiction, ServiceGroup, done));
});

describe('ServiceGroup instance put', () => {
  let servicegroup = ServiceGroup.fake();

  before(done => {
    servicegroup.post((error, created) => {
      servicegroup = created;
      done(error, created);
    });
  });

  it('should be able to put', done => {
    servicegroup = servicegroup.fakeOnly('name');

    servicegroup.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(servicegroup._id);
      expect(updated.name).to.eql(servicegroup.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    servicegroup.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(servicegroup._id);
      done();
    });
  });

  after(done => clear(done));
});
