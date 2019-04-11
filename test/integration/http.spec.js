'use strict';

/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const {
  ServiceGroup,
  apiVersion,
  app
} = require(path.join(__dirname, '..', '..'));


describe('ServiceGroup', function () {

  describe('Rest API', function () {

    before(function (done) {
      ServiceGroup.deleteMany(done);
    });

    let servicegroup;

    it('should handle HTTP POST on /servicegroups', function (done) {

      servicegroup = ServiceGroup.fake();

      request(app)
        .post(`/${apiVersion}/servicegroups`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(servicegroup)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.code).to.exist;
          expect(created.name).to.exist;

          done(error, response);

        });

    });

    it('should handle HTTP GET on /servicegroups', function (done) {

      request(app)
        .get(`/${apiVersion}/servicegroups`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert payload
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

    it('should handle HTTP GET on /servicegroups/id:', function (done) {

      request(app)
        .get(
          `/${apiVersion}/servicegroups/${servicegroup._id}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(servicegroup._id.toString());
          expect(found.name.en).to.be.equal(servicegroup.name.en);

          done(error, response);

        });

    });

    it('should handle HTTP PATCH on /servicegroups/id:', function (done) {

      const patch = servicegroup.fakeOnly('name');

      request(app)
        .patch(
          `/${apiVersion}/servicegroups/${servicegroup._id}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(servicegroup._id.toString());
          expect(patched.name.en).to.be.equal(servicegroup.name.en);

          done(error, response);

        });

    });

    it('should handle HTTP PUT on /servicegroups/id:', function (done) {

      const put = servicegroup.fakeOnly('name');

      request(app)
        .put(
          `/${apiVersion}/servicegroups/${servicegroup._id}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updated = response.body;

          expect(updated._id).to.exist;
          expect(updated._id).to.be.equal(servicegroup._id.toString());
          expect(updated.name.en).to.be.equal(servicegroup.name.en);

          done(error, response);

        });

    });

    it('should handle HTTP DELETE on /servicegroups/:id', function (
      done) {

      request(app)
        .delete(
          `/${apiVersion}/servicegroups/${servicegroup._id}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(servicegroup._id.toString());
          expect(deleted.name.en).to.be.equal(servicegroup.name.en);

          done(error, response);

        });

    });


    after(function (done) {
      ServiceGroup.deleteMany(done);
    });

  });

});
