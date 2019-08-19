import { expect } from '@lykmapipo/mongoose-test-helpers';
import ServiceGroup from '../../src/servicegroup.model';

describe('ServiceGroup', () => {
  describe('Statics', () => {
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
});
