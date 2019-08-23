import request from 'supertest';
import { app, mount } from '@lykmapipo/express-common';
import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup, apiVersion, servicegroupRouter } from '../../src';

describe('ServiceGroup', () => {
  mount(servicegroupRouter);
  describe('Rest API', () => {
    let servicegroup;

    before(done => clear(ServiceGroup, done));

    it('should handle HTTP POST on /servicegroups', done => {
      servicegroup = ServiceGroup.fake();

      request(app)
        .post(`/${apiVersion}/servicegroups`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(servicegroup)
        .expect(201)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.code).to.exist;
          expect(created.name).to.exist;

          done(error, response);
        });
    });

    it('should handle HTTP GET on /servicegroups', done => {
      request(app)
        .get(`/${apiVersion}/servicegroups`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          // assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);
        });
    });

    it('should handle HTTP GET on /servicegroups/id:', done => {
      request(app)
        .get(`/${apiVersion}/servicegroups/${servicegroup._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(servicegroup._id.toString());
          expect(found.name.en).to.be.equal(servicegroup.name.en);

          done(error, response);
        });
    });

    it('should handle HTTP PATCH on /servicegroups/id:', done => {
      const patch = servicegroup.fakeOnly('name');

      request(app)
        .patch(`/${apiVersion}/servicegroups/${servicegroup._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(servicegroup._id.toString());
          expect(patched.name.en).to.be.equal(servicegroup.name.en);

          done(error, response);
        });
    });

    it('should handle HTTP PUT on /servicegroups/id:', done => {
      const put = servicegroup.fakeOnly('name');

      request(app)
        .put(`/${apiVersion}/servicegroups/${servicegroup._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updated = response.body;

          expect(updated._id).to.exist;
          expect(updated._id).to.be.equal(servicegroup._id.toString());
          expect(updated.name.en).to.be.equal(servicegroup.name.en);

          done(error, response);
        });
    });

    it('should handle HTTP DELETE on /servicegroups/:id', done => {
      request(app)
        .delete(`/${apiVersion}/servicegroups/${servicegroup._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(servicegroup._id.toString());
          expect(deleted.name.en).to.be.equal(servicegroup.name.en);

          done(error, response);
        });
    });

    after(done => clear('ServiceGroup', done));
  });
});
