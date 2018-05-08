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
 * @see {@link Jurisdiction}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const _ = require('lodash');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const localize = require('mongoose-locale-schema');
const { Jurisdiction } = require('majifix-jurisdiction');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/* local constants */
const DEFAULT_LOCALE = (process.env.DEFAULT_LOCALE || 'en');
const LOCALES = [DEFAULT_LOCALE];
const MODEL_NAME = 'ServiceGroup';

/* declarations */
let locales = _.get(process, 'env.LOCALES', '').split(',');
locales = ([].concat(LOCALES).concat(locales));
locales = _.compact(locales);
locales = _.uniq(locales);
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
   * @type {Object}
   * @see {@link Jurisdiction}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  jurisdiction: {
    type: ObjectId,
    ref: Jurisdiction.MODEL_NAME,
    autoset: true,
    exists: true,
    autopopulate: {
      select: { code: 1, name: 1 }
    },
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
   * @type {Object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  code: {
    type: String,
    // unique: true, see index section below for compound index
    // used to enforce uniqueness
    required: true,
    trim: true,
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
   * @type {Object}
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
  name: localize({ //TODO use multi language
    type: String,
    // unique: true, see index section below for compound index
    // used to enforce uniqueness
    required: true,
    trim: true,
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
   * @type {Object}
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
   * @type {Object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force upper-casing
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  color: {
    type: String,
    uppercase: true,
    trim: true,
    default: function () { return randomColor().toUpperCase(); }
  }

}, { timestamps: true, emitIndexErrors: true });



//Indexes

//ensure `unique` compound index on jurisdiction, name and code
//to fix unique indexes on code and name in case they are used in more than
//one jurisdiction with different administration
_.forEach(locales, function (locale) {
  const field = `name.${locale.name}`;
  ServiceGroupSchema.index({ jurisdiction: 1, [field]: 1, code: 1 }, { unique: true });
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

/* Statics */
ServiceGroupSchema.statics.MODEL_NAME = MODEL_NAME;


//Plugins

/* use mongoose rest actions*/
ServiceGroupSchema.plugin(actions);



/* export jurisdiction model */
module.exports = mongoose.model(MODEL_NAME, ServiceGroupSchema);