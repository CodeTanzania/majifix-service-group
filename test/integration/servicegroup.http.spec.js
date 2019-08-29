import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import { clear as clearDb, expect } from '@lykmapipo/mongoose-test-helpers';
import { ServiceGroup, serviceGroupRouter } from '../../src/index';

describe('ServiceGroup Rest API', () => {
  const servicegroups = ServiceGroup.fake();

  const options = {
    pathSingle: '/servicegroups/:id',
    pathList: '/servicegroups/',
    pathSchema: '/servicegroups/schema/',
    pathExport: '/servicegroups/export/',
  };

  before(() => clearHttp());

  before(done => clearDb(done));

  it('should handle HTTP POST on /servicegroups', done => {
    const { testPost } = testRouter(options, serviceGroupRouter);
    testPost({ ...servicegroups.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new ServiceGroup(body);
        expect(created._id).to.exist.and.be.eql(servicegroups._id);
        expect(created.code).to.exist.and.be.eql(servicegroups.code);
        expect(created.name.en).to.exist.and.be.eql(servicegroups.name.en);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /servicegroups', done => {
    const { testGet } = testRouter(options, serviceGroupRouter);
    testGet({ servicegroups })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle GET /servicegroups/schema', done => {
    const { testGetSchema } = testRouter(options, serviceGroupRouter);
    testGetSchema().expect(200, done);
  });

  it('should handle GET /servicegroups/export', done => {
    const { testGetExport } = testRouter(options, serviceGroupRouter);
    testGetExport()
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(({ headers }) => {
        expect(headers['content-disposition']).to.exist;
      })
      .expect(200, done);
  });

  it('should handle HTTP GET on /servicegroups/id:', done => {
    const { testGet } = testRouter(options, serviceGroupRouter);
    const params = { id: servicegroups._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new ServiceGroup(body);
        expect(found._id).to.exist.and.be.eql(servicegroups._id);
        expect(found.code).to.exist.and.be.eql(servicegroups.code);
        expect(found.name.en).to.exist.and.be.eql(servicegroups.name.en);
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /servicegroups/id:', done => {
    const { testPatch } = testRouter(options, serviceGroupRouter);
    const { name } = servicegroups.fakeOnly('name');
    const params = { id: servicegroups._id.toString() };
    testPatch(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new ServiceGroup(body);
        expect(patched._id).to.exist.and.be.eql(servicegroups._id);
        expect(patched.code).to.exist.and.be.eql(servicegroups.code);
        expect(patched.name.en).to.be.equal(servicegroups.name.en);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /servicegroups/id:', done => {
    const { testPut } = testRouter(options, serviceGroupRouter);
    const { name } = servicegroups.fakeOnly('name');
    const params = { id: servicegroups._id.toString() };
    testPut(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const put = new ServiceGroup(body);
        expect(put._id).to.exist.and.be.eql(servicegroups._id);
        expect(put.code).to.exist.and.be.eql(servicegroups.code);
        expect(put.name.en).to.be.equal(servicegroups.name.en);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /servicegroups/:id', done => {
    const { testDelete } = testRouter(options, serviceGroupRouter);
    const params = { id: servicegroups._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const deleted = new ServiceGroup(body);
        expect(deleted._id).to.exist.and.be.eql(servicegroups._id);
        expect(deleted.code).to.exist.and.be.eql(servicegroups.code);
        expect(deleted.name.en).to.be.equal(servicegroups.name.en);
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clearDb(done));
});
