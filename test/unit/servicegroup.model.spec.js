import { expect } from '@lykmapipo/mongoose-test-helpers';
import ServiceGroup from '../../src/servicegroup.model';

describe('ServiceGroup Instance', () => {
  it('`preValidate` should be a function', () => {
    const group = ServiceGroup.fake();
    expect(group.preValidate).to.exist;
    expect(group.preValidate).to.be.a('function');
    expect(group.preValidate.length).to.be.equal(1);
    expect(group.preValidate.name).to.be.equal('preValidate');
  });

  it('should be able to ensure color and code', done => {
    const group = ServiceGroup.fake();
    group.set({ color: undefined, code: undefined });

    expect(group.color).to.not.exist;
    expect(group.code).to.not.exist;
    group.preValidate(error => {
      expect(group.code).to.exist;
      expect(group.code).to.eql(group.code.toUpperCase());
      expect(group.color).to.exist;

      done(error);
    });
  });
});

describe('ServiceGroup Statics', () => {
  it('should expose model name as constant', () => {
    expect(ServiceGroup.MODEL_NAME).to.exist;
    expect(ServiceGroup.MODEL_NAME).to.be.equal('ServiceGroup');
  });

  it('should expose autopulate as options', () => {
    expect(ServiceGroup.OPTION_AUTOPOPULATE).to.exist;
    expect(ServiceGroup.OPTION_AUTOPOPULATE).to.be.eql({
      select: { code: 1, name: 1, color: 1 },
      maxDepth: 1,
    });
  });

  it('should expose field select option', () => {
    expect(ServiceGroup.OPTION_SELECT).to.exist;
    expect(ServiceGroup.OPTION_SELECT).to.be.eql({
      code: 1,
      name: 1,
      color: 1,
    });
  });
});
