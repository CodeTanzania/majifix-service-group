import path from 'path';
import _ from 'lodash';
import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup } from '../../src';

describe('ServiceGroup Seed', () => {
  const { SEEDS_PATH } = process.env;
  let servicegroup;

  before(done => clear(done));

  before(() => {
    process.env.SEEDS_PATH = path.join(__dirname, '..', 'fixtures');
  });

  it('should be able to seed', done => {
    ServiceGroup.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      servicegroup = _.first(seeded);
      done(error, seeded);
    });
  });

  it('should not throw if seed exist', done => {
    ServiceGroup.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', done => {
    const seed = ServiceGroup.fake().toObject();
    ServiceGroup.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', done => {
    const seed = ServiceGroup.fake().toObject();
    ServiceGroup.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', done => {
    const seed = servicegroup.toObject();
    ServiceGroup.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should be able to seed from environment', done => {
    ServiceGroup.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', done => {
    ServiceGroup.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  after(done => clear(done));

  after(() => {
    process.env.SEEDS_PATH = SEEDS_PATH;
  });
});
