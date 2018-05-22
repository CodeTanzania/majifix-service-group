'use strict';


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
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction|Jurisdiction}
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { ServiceGroup }= require('majifix-service-group');
 *
 * ...
 *
 * ServiceGroup.findOne(<criteria>).exec(done);
 *
 * ...
 *
 */


/* dependencies */
const _ = require('lodash');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const localize = require('mongoose-locale-schema');
const { env, schema } = require('@codetanzania/majifix-common');
const { Jurisdiction } = require('majifix-jurisdiction');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;



/* local constants */
const DEFAULT_LOCALE = env.DEFAULT_LOCALE;
const MODEL_NAME = 'ServiceGroup';
const OPTION_AUTOPOPULATE = {
  select: { code: 1, name: 1, color: 1 },
  maxDepth: schema.POPULATION_MAX_DEPTH
};

const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });


/* declarations */
let locales = env.LOCALES;
locales = _.map(locales, function (locale) {
  let option = { name: locale };
  if (locale === DEFAULT_LOCALE) {
    option.required = true;
  }
  return option;
});


/**
 * @name ServiceGroupSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ServiceGroupSchema = new Schema({

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
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - jurisdiction population options
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  jurisdiction: {
    type: ObjectId,
    ref: Jurisdiction.MODEL_NAME,
    autoset: true,
    exists: true,
    autopopulate: Jurisdiction.OPTION_AUTOPOPULATE,
    index: true
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
   * @property {boolean} uppercase - force uppercasing
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  code: {
    type: String,
    trim: true,
    required: true,
    uppercase: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'finance',
      type: 'account'
    }
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
   * @property {boolean} searchable - allow for searching
   * @property {array}  locales - list of supported locales
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  name: localize({
    type: String,
    trim: true,
    required: true,
    index: true,
    searchable: true,
    locales: locales,
    fake: {
      generator: 'random',
      type: 'word'
    }
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
   * @property {boolean} searchable - allow for searching
   * @property {array}  locales - list of supported locales
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  description: localize({
    type: String,
    trim: true,
    index: true,
    searchable: true,
    locales: locales,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    }
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
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  color: {
    type: String,
    trim: true,
    uppercase: true,
    default: function () { return randomColor().toUpperCase(); },
    fake: true
  }

}, SCHEMA_OPTIONS);



//Indexes

//ensure `unique` compound index on jurisdiction, code and name
//to fix unique indexes on code and name in case they are used in more than
//one jurisdiction with different administration
_.forEach(locales, function (locale) {
  const field = `name.${locale.name}`;
  ServiceGroupSchema.index({ jurisdiction: 1, code: 1, [field]: 1 }, { unique: true });
});



//Hooks

ServiceGroupSchema.pre('validate', function (next) {

  //set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = randomColor();
  }

  //set service group code
  if (_.isEmpty(this.code) && !_.isEmpty(this.name)) {
    this.code = _.take(this.name, 1).join('').toUpperCase();
  }

  next();

});



/* Instance */

/**
 * @name beforeDelete
 * @function beforeDelete
 * @description pre delete servicegroup logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
ServiceGroupSchema.methods.beforeDelete = function beforeDelete(done) {
  //TODO prevent delete if
  //1...there are service request use the servicegroup
  done();
};


/**
 * @name afterPost
 * @function afterPost
 * @description post save servicegroup logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
ServiceGroupSchema.methods.afterPost = function afterPost(done) {
  //ensure jurisdiction is populated after post(save)
  const population =
    _.merge({}, { path: 'jurisdiction' }, Jurisdiction.OPTION_AUTOPOPULATE);
  this.populate(population, done);
};


/* Statics */

/* expose static constants */
ServiceGroupSchema.statics.MODEL_NAME = MODEL_NAME;
ServiceGroupSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
ServiceGroupSchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;


/* Plugins */

/* use mongoose rest actions*/
ServiceGroupSchema.plugin(actions);


/* export servicegroup model */
module.exports = mongoose.model(MODEL_NAME, ServiceGroupSchema);