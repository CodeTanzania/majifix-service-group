/* dependencies */
import { expect } from 'chai';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup } from '../../src';

describe('ServiceGroup', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, ServiceGroup, done));

  before(done => create(jurisdiction, done));

  describe('static post', () => {
    let servicegroup;

    it('should be able to post', done => {
      servicegroup = ServiceGroup.fake();
      servicegroup.jurisdiction = jurisdiction;

      ServiceGroup.post(servicegroup, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(servicegroup._id);
        expect(created.name.en).to.eql(servicegroup.name.en);
        expect(created.code).to.eql(servicegroup.code);

        // assert jurisdiction
        expect(created.jurisdiction).to.exist;
        expect(created.jurisdiction.code).to.eql(
          servicegroup.jurisdiction.code
        );
        expect(created.jurisdiction.name).to.eql(
          servicegroup.jurisdiction.name
        );
        done(error, created);
      });
    });
  });

  describe('instance post', () => {
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
  });

  after(done => clear('Jurisdiction', 'ServiceGroup', done));
});
