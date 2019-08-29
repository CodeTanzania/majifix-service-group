import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { create, clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup } from '../../src/index';

describe('ServiceGroup static post', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, ServiceGroup, done));

  before(done => create(jurisdiction, done));

  let servicegroup;

  it('should be able to post', done => {
    servicegroup = ServiceGroup.fake();
    servicegroup.set({ jurisdiction });

    ServiceGroup.post(servicegroup, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(servicegroup._id);
      expect(created.name.en).to.eql(servicegroup.name.en);
      expect(created.code).to.eql(servicegroup.code);

      // assert jurisdiction
      expect(created.jurisdiction).to.exist;
      expect(created.jurisdiction.code).to.eql(servicegroup.jurisdiction.code);
      expect(created.jurisdiction.name).to.eql(servicegroup.jurisdiction.name);
      done(error, created);
    });
  });

  after(done => clear(Jurisdiction, ServiceGroup, done));
});

describe('ServiceGroup instance post', () => {
  before(done => clear(done));

  let servicegroup;

  it('should be able to post', done => {
    servicegroup = ServiceGroup.fake();

    servicegroup.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(servicegroup._id);
      expect(created.name).to.eql(servicegroup.name);
      expect(created.code).to.eql(servicegroup.code);
      done(error, created);
    });
  });

  after(done => clear(done));
});
