'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const ServiceGroup =
  require(path.join(__dirname, '..', '..', 'lib', 'servicegroup.model'));


describe('ServiceGroup', function () {

  describe('Statics', function () {

    it('should expose model name as constant', function () {
      expect(ServiceGroup.MODEL_NAME).to.exist;
      expect(ServiceGroup.MODEL_NAME).to.be.equal('ServiceGroup');
    });

    it('should expose autopulate as options', function () {
      expect(ServiceGroup.OPTION_AUTOPOPULATE).to.exist;
      expect(ServiceGroup.OPTION_AUTOPOPULATE)
        .to.be.eql({
          select: { code: 1, name: 1, color: 1 }
        });
    });

  });


});