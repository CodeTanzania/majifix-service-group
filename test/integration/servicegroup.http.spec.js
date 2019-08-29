import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  clear as clearDb,
  create,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { ServiceGroup, serviceGroupRouter } from '../../src';

describe('ServiceGroup Rest API', () => {
  const jurisdiction = Jurisdiction.fake();
  const serviceGroup = ServiceGroup.fake();
  serviceGroup.set({ jurisdiction });

  const options = {
    pathSingle: '/servicegroups/:id',
    pathList: '/servicegroups',
    pathSchema: '/servicegroups/schema/',
    pathExport: '/servicegroups/export/',
  };

  before(done => clearDb(ServiceGroup, Jurisdiction, done));

  before(() => clearHttp());

  before(done => create(jurisdiction, done));

  it('should handle HTTP POST on /servicegroups', done => {
    const { testPost } = testRouter(options, serviceGroupRouter);
    testPost({ ...serviceGroup.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new ServiceGroup(body);
        expect(created._id).to.exist.and.be.eql(serviceGroup._id);
        expect(created.code).to.exist.and.be.eql(serviceGroup.code);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /servicegroups', done => {
    const { testGet } = testRouter(options, serviceGroupRouter);
    testGet()
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

  it('should handle HTTP GET on /servicegroups/:id', done => {
    const { testGet } = testRouter(options, serviceGroupRouter);
    const params = { id: serviceGroup._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new ServiceGroup(body);
        expect(found._id).to.exist.and.be.eql(serviceGroup._id);
        expect(found.code).to.exist.and.be.eql(serviceGroup.code);
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /servicegroups/:id', done => {
    const { testPatch } = testRouter(options, serviceGroupRouter);
    const { description } = serviceGroup.fakeOnly('description');
    const params = { id: serviceGroup._id.toString() };
    testPatch(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new ServiceGroup(body);
        expect(patched._id).to.exist.and.be.eql(serviceGroup._id);
        expect(patched.code).to.exist.and.be.eql(serviceGroup.code);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /servicegroups/:id', done => {
    const { testPut } = testRouter(options, serviceGroupRouter);
    const { description } = serviceGroup.fakeOnly('description');
    const params = { id: serviceGroup._id.toString() };
    testPut(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new ServiceGroup(body);
        expect(patched._id).to.exist.and.be.eql(serviceGroup._id);
        expect(patched.code).to.exist.and.be.eql(serviceGroup.code);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /servicegroups/:id', done => {
    const { testDelete } = testRouter(options, serviceGroupRouter);
    const params = { id: serviceGroup._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new ServiceGroup(body);
        expect(patched._id).to.exist.and.be.eql(serviceGroup._id);
        expect(patched.code).to.exist.and.be.eql(serviceGroup.code);
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clearDb(ServiceGroup, Jurisdiction, done));
});
