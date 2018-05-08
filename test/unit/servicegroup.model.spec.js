'use strict';

const path = require('path');
const {
    expect
} = require('chai');

/* declaration */
const ServiceGroup =
    require(path.join(__dirname, '..', '..', 'lib', 'servicegroup.model'));


describe('ServiceGroup', function () {

    describe('Statics', function () {

        it('should expose model name as constant', function () {
            expect(ServiceGroup.MODEL_NAME).to.exist;
            expect(ServiceGroup.MODEL_NAME).to.equal('ServiceGroup');
        });
    });
});
