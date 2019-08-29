import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Priority } from '@codetanzania/majifix-priority';
import { create, clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup } from '../../src/index';

describe('ServiceGroup static delete', () => {
  before(done => clear(Jurisdiction, Priority, done));

  const jurisdiction = Jurisdiction.fake();
  const priority = Priority.fake();

  before(done => create(jurisdiction, priority, done));
  let servicegroup;

  before(done => {
    servicegroup = ServiceGroup.fake();
    servicegroup.jurisdiction = jurisdiction;
    servicegroup.priority = priority;
    create(servicegroup, done);
  });

  it('should be able to delete', done => {
    ServiceGroup.del(servicegroup._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(servicegroup._id);

      // assert jurisdiction
      expect(deleted.jurisdiction).to.exist;
      expect(deleted.jurisdiction.code).to.eql(servicegroup.jurisdiction.code);
      expect(deleted.jurisdiction.name).to.eql(servicegroup.jurisdiction.name);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    ServiceGroup.del(servicegroup._id, (error, deleted) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => clear(Jurisdiction, Priority, done));
});

describe('ServiceGroup instance delete', () => {
  before(done => clear(done));

  let servicegroup = ServiceGroup.fake();

  before(done => {
    servicegroup.post((error, created) => {
      servicegroup = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    servicegroup.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(servicegroup._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    servicegroup.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(servicegroup._id);
      done();
    });
  });

  before(done => clear(done));
});
