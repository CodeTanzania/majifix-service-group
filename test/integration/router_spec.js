'use strict';

/**
 * ServiceGroup router specification
 *
 * @description :: Server-side router specification for ServiceGroup
 */

//dependencies
const path = require('path');
const expect = require('chai').expect;
const faker = require('faker');
const request = require('supertest');
const bodyParser = require('body-parser');
const router = require(path.join(__dirname, '..', '..', 'http', 'router'))();
const app = require('express')();


//  use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(router);

let serviceGroup;

describe('ServiceGroup Router', function () {
  it('should handle HTTP POST on /servicegroups', done => {
    serviceGroup = {
      name: faker.company.companyName(),
      code: faker.random.alphaNumeric(4)
    };

    request(app)
      .post('/servicegroups')
      .send(serviceGroup)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = response.body;

        expect(created).to.exist;

        expect(created._id).to.exist;
        expect(created.code).to.exist;
        expect(created.name).to.be.equal(serviceGroup.name);
        expect(created.code).to.be.equal(serviceGroup.code);


        serviceGroup = created;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /servicegroups/:id', done => {

    request(app)
      .get('/servicegroups/' + serviceGroup._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = response.body;

        expect(found).to.exist;

        expect(found._id).to.exist;
        expect(found._id).to.eql(serviceGroup._id);

        expect(found.code).to.be.equal(serviceGroup.code);
        expect(found.name).to.be.equal(serviceGroup.name);

        done(error, response);

      });
  });

  it('should handle HTTP PUT on /servicegroups/:id', done => {

    const updates = {
      name: faker.company.companyName()
    };

    request(app)
      .put('/servicegroups/' + serviceGroup._id)
      .send(updates)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;
        expect(updated).to.exist;

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(serviceGroup._id);

        expect(updated.code).to.be.equal(serviceGroup.code);
        expect(updated.name).to.be.equal(updates.name);

        serviceGroup = updated;

        done(error, response);

      });

  });

  it('should handle HTTP PATCH on /servicegroups/:id', done => {
    const updates = {
      name: faker.company.companyName()
    };

    request(app)
      .patch('/servicegroups/' + serviceGroup._id)
      .send(updates)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;
        expect(updated).to.exist;

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(serviceGroup._id);

        expect(updated.code).to.be.equal(serviceGroup.code);
        expect(updated.name).to.be.equal(updates.name);

        serviceGroup = updated;

        done(error, response);

      });
  });

  it('should handle HTTP GET on /servicegroups', done => {
    request(app)
      .get('/servicegroups')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const {
          servicegroups,
          pages,
          count
        } = response.body;
        expect(pages).to.exist;
        expect(servicegroups).to.exist;
        expect(count).to.exist;

        //TODO more servicegroups response assertions

        done(error, response);

      });

  });

  it('should handle HTTP DELETE on /servicegroups/:id', done => {
    request(app)
      .delete('/servicegroups/' + serviceGroup._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const removed = response.body;
        expect(removed).to.exist;

        expect(removed._id).to.exist;
        expect(removed._id).to.be.eql(serviceGroup._id);

        expect(removed.code).to.be.equal(serviceGroup.code);
        expect(removed.name).to.be.equal(serviceGroup.name);

        done(error, response);

      });
  });
});