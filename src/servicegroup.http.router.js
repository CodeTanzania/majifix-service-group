import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';
import ServiceGroup from './servicegroup.model';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/servicegroups/:id';
const PATH_LIST = '/servicegroups';
const PATH_EXPORT = '/servicegroups/export';
const PATH_SCHEMA = '/servicegroups/schema/';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/servicegroups';

/**
 * @name ServiceGroupHttpRouter
 * @namespace ServiceGroupHttpRouter
 *
 * @description A representation of an entity that group service
 * offered by a jurisdiction(s) into meaningful categories e.g Sanitation.
 *
 * It provides a way to group several service request types
 * (issues) under meaningful categories such as Sanitation,
 * Commercial, Billing, Non-Commercial etc.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */
const router = new Router({
  version: API_VERSION,
});

/**
 * @name GetServiceGroups
 * @memberof ServiceGroupHttpRouter
 * @description Returns a list of service groups
 */
router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => ServiceGroup.get(options, done),
  })
);

/**
 * @name GetServiceGroupSchema
 * @memberof ServiceGroupHttpRouter
 * @description Returns servicegroup json schema definition
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = ServiceGroup.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportServiceGroups
 * @memberof ServiceGroupHttpRouter
 * @description Export servicegroups as csv
 */
router.get(
  PATH_EXPORT,
  downloadFor({
    download: (options, done) => {
      const fileName = `servicegroups_exports_${Date.now()}.csv`;
      const readStream = ServiceGroup.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostServiceGroup
 * @memberof ServiceGroupHttpRouter
 * @description Create new service group
 */
router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => ServiceGroup.post(body, done),
  })
);

/**
 * @name GetServiceGroup
 * @memberof ServiceGroupHttpRouter
 * @description Get existing service group
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => ServiceGroup.getById(options, done),
  })
);

/**
 * @name PatchServiceGroup
 * @memberof ServiceGroupHttpRouter
 * @description Patch existing service group
 */
router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (options, done) => ServiceGroup.patch(options, done),
  })
);

/**
 * @name PutServiceGroup
 * @memberof ServiceGroupHttpRouter
 * @description Put existing service group
 */
router.put(
  PATH_SINGLE,
  putFor({
    put: (options, done) => ServiceGroup.put(options, done),
  })
);

/**
 * @name DeleteServiceGroup
 * @memberof ServiceGroupHttpRouter
 * @description Delete existing service group
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (options, done) => ServiceGroup.del(options, done),
    soft: true,
  })
);

/**
 * @name GetJurisdictionServiceGroups
 * @memberof ServiceGroupHttpRouter
 * @description Returns a list of servicegroups of specified jurisdiction
 */
router.get(
  PATH_JURISDICTION,
  getFor({
    get: (options, done) => ServiceGroup.get(options, done),
  })
);

/* expose router */
export default router;
