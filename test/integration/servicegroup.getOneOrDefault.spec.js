import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup } from '../../src/index';

describe('ServiceGroup getOneOrDefault', () => {
  before(done => clear(done));

  let servicegroup = ServiceGroup.fake();
  servicegroup.default = true;

  before(done => {
    servicegroup.post((error, created) => {
      servicegroup = created;
      done(error, created);
    });
  });

  it('should be able to get existing by id', done => {
    const { _id } = servicegroup;
    ServiceGroup.getOneOrDefault({ _id }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(servicegroup._id);
      done(error, found);
    });
  });

  it('should be able to get existing with criteria', done => {
    const name = servicegroup.name.en;
    ServiceGroup.getOneOrDefault({ 'name.en': name }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(servicegroup._id);
      done(error, found);
    });
  });

  it('should be able to get default with criteria', done => {
    ServiceGroup.getOneOrDefault({}, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(servicegroup._id);
      done(error, found);
    });
  });

  it('should not throw if not exists', done => {
    const { _id } = ServiceGroup.fake();
    ServiceGroup.getOneOrDefault({ _id }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(servicegroup._id);
      done(error, found);
    });
  });

  after(done => clear(done));
});
