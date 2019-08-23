import { randomColor, idOf, mergeObjects, compact, pkg } from '@lykmapipo/common';
import { getString, apiVersion as apiVersion$1 } from '@lykmapipo/env';
export { start } from '@lykmapipo/express-common';
import _ from 'lodash';
import { model, createSchema, ObjectId } from '@lykmapipo/mongoose-common';
import { localizedIndexesFor, localize, localizedKeysFor, localizedValuesFor } from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Priority } from '@codetanzania/majifix-priority';
import { MODEL_NAME_SERVICEGROUP, checkDependenciesFor, POPULATION_MAX_DEPTH, COLLECTION_NAME_SERVICEGROUP, MODEL_NAME_SERVICE, MODEL_NAME_SERVICEREQUEST, PATH_NAME_SERVICEGROUP } from '@codetanzania/majifix-common';
import { Router, getFor, schemaFor, downloadFor, postFor, getByIdFor, patchFor, putFor, deleteFor } from '@lykmapipo/express-rest-actions';

/**
 * @module ServiceGroup
 * @name ServiceGroup
 * @description A representation of an entity that group service
 * offered by a jurisdiction(s) into meaningful categories e.g Sanitation.
 *
 * It provides a way to group several service request types
 * (issues) under meaningful categories such as Sanitation,
 * Commercial, Billing, Non-Commercial etc.
 *
 * @requires https://github.com/CodeTanzania/majifix-jurisdiction
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction}
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */

/* constants */
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const OPTION_SELECT = { code: 1, name: 1, color: 1 };
const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: POPULATION_MAX_DEPTH,
};
const SCHEMA_OPTIONS = { collection: COLLECTION_NAME_SERVICEGROUP };
const INDEX_UNIQUE = {
  jurisdiction: 1,
  code: 1,
  ...localizedIndexesFor('name'),
};

/**
 * @name ServiceGroupSchema
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const ServiceGroupSchema = createSchema(
  {
    /**
     * @name jurisdiction
     * @description A jurisdiction under which a service group is applicable.
     *
     * If not available a service group is applicable to all
     * jurisdictions.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    jurisdiction: {
      type: ObjectId,
      ref: Jurisdiction.MODEL_NAME,
      exists: { refresh: true, select: Jurisdiction.OPTION_SELECT },
      autopopulate: Jurisdiction.OPTION_AUTOPOPULATE,
      index: true,
    },

    /**
     * @name priority
     * @description A default priority of the service group.
     *
     * It assigned to service and service request if no priority set.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    priority: {
      type: ObjectId,
      ref: Priority.MODEL_NAME,
      exists: { refresh: true, select: Priority.OPTION_SELECT },
      autopopulate: Priority.OPTION_AUTOPOPULATE,
      index: true,
    },

    /**
     * @name code
     * @description A unique identifier of the service group.
     *
     * Used in deriving code of the service request(issue) and
     * internal jurisdiction usage i.e act as an issue
     * identifier.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} uppercase - force upper-casing
     * @property {boolean} index - ensure database index
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    code: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
      index: true,
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'finance',
        type: 'account',
      },
    },

    /**
     * @name name
     * @description A unique human readable name of the service group
     * e.g Sanitation.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    name: localize({
      type: String,
      trim: true,
      index: true,
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'hacker',
        type: 'noun',
      },
    }),

    /**
     * @name description
     * @description A detailed human readable explanation about the
     * service group.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} exportable - allow field to be exporteds
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    description: localize({
      type: String,
      trim: true,
      index: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'lorem',
        type: 'paragraph',
      },
    }),

    /**
     * @name color
     * @description A color code(in hexadecimal format) eg. #363636 used to
     * differentiate a service group visually from other service group.
     *
     * If not provided it will randomly generated, but it is not
     * guarantee its visual appeal.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} uppercase - force upper-casing
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    color: {
      type: String,
      trim: true,
      exportable: true,
      uppercase: true,
      default: () => randomColor(),
      fake: true,
    },

    /**
     * @name default
     * @description Tells whether a service group is the default.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * false
     *
     */
    default: {
      type: Boolean,
      index: true,
      exportable: true,
      default: false,
      fake: true,
    },
  },
  SCHEMA_OPTIONS,
  actions,
  exportable
);

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

/**
 * @name index
 * @description ensure unique compound index on service group name, code
 * and jurisdiction to force unique service group definition
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
ServiceGroupSchema.index(INDEX_UNIQUE, { unique: true });

/*
 *------------------------------------------------------------------------------
 * Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @description service group schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
ServiceGroupSchema.pre('validate', function preValidate(next) {
  return this.preValidate(next);
});

/*
 *------------------------------------------------------------------------------
 * Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @description service group schema pre validation hook logic
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
ServiceGroupSchema.methods.preValidate = function preValidate(done) {
  // set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = randomColor();
  }

  // set service group code
  if (_.isEmpty(this.code) && !_.isEmpty(this.name[DEFAULT_LOCALE])) {
    this.code = _.take(this.name[DEFAULT_LOCALE], 1)
      .join('')
      .toUpperCase();
  }

  // continue
  return done();
};

/**
 * @name beforeDelete
 * @function beforeDelete
 * @description pre delete service group logics
 * @param  {Function} done callback to invoke on success or error
 * @returns {object|Error} dependence free instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
ServiceGroupSchema.methods.beforeDelete = function beforeDelete(done) {
  // restrict delete if

  // collect dependencies model name
  const dependencies = [MODEL_NAME_SERVICE, MODEL_NAME_SERVICEREQUEST];

  // path to check
  const path = PATH_NAME_SERVICEGROUP;

  // do check dependencies
  return checkDependenciesFor(this, { path, dependencies }, done);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
ServiceGroupSchema.statics.MODEL_NAME = MODEL_NAME_SERVICEGROUP;
ServiceGroupSchema.statics.OPTION_SELECT = OPTION_SELECT;
ServiceGroupSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/**
 * @name findDefault
 * @function findDefault
 * @description find default service group
 * @param {Function} done a callback to invoke on success or failure
 * @returns {ServiceGroup} default service group
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
ServiceGroupSchema.statics.findDefault = done => {
  // refs
  const ServiceGroup = model(MODEL_NAME_SERVICEGROUP);

  // obtain default service group
  return ServiceGroup.getOneOrDefault({}, done);
};

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description define seed data criteria
 * @param {object} seed service group to be seeded
 * @returns {object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @static
 */
ServiceGroupSchema.statics.prepareSeedCriteria = seed => {
  const names = localizedKeysFor('name');

  const copyOfSeed = seed;
  copyOfSeed.name = localizedValuesFor(seed.name);

  const criteria = idOf(copyOfSeed)
    ? _.pick(copyOfSeed, '_id')
    : _.pick(copyOfSeed, 'jurisdiction', 'code', ...names);

  return criteria;
};

/**
 * @name getOneOrDefault
 * @function getOneOrDefault
 * @description Find existing service group or default based on given criteria
 * @param {object} criteria valid query criteria
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found service group or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const criteria = { _id: '...'};
 * ServiceGroup.getOneOrDefault(criteria, (error, found) => { ... });
 *
 */
ServiceGroupSchema.statics.getOneOrDefault = (criteria, done) => {
  // normalize criteria
  const { _id, ...filters } = mergeObjects(criteria);
  const allowId = !_.isEmpty(_id);
  const allowFilters = !_.isEmpty(filters);

  const byDefault = mergeObjects({ default: true });
  const byId = mergeObjects({ _id });
  const byFilters = mergeObjects(filters);

  const or = compact([
    allowId ? byId : undefined,
    allowFilters ? byFilters : undefined,
     byDefault ,
  ]);
  const filter = { $or: or };

  // refs
  const ServiceGroup = model(MODEL_NAME_SERVICEGROUP);

  // query
  return ServiceGroup.findOne(filter)
    .orFail()
    .exec(done);
};

/* export servicegroup model */
var ServiceGroup = model(MODEL_NAME_SERVICEGROUP, ServiceGroupSchema);

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

/**
 * @name majifix-service-group
 * @description A representation of an entity that group service
 * offered by a jurisdiction(s) into meaningful categories e.g Sanitation.
 *
 * It provides a way to group several service request types
 * (issues) under meaningful categories such as Sanitation,
 * Commercial, Billing, Non-Commercial etc.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { ServiceGroup, start } = require('majifix-service-group');
 * start(error => { ... });
 *
 */

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = apiVersion$1();

export { ServiceGroup, apiVersion, info, router as serviceGroupRouter };
