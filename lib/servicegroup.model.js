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
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction}
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */


/* dependencies */
const _ = require('lodash');
const async = require('async');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const localize = require('mongoose-locale-schema');
const { schema, models } = require('@codetanzania/majifix-common');
const { getString, getStrings } = require('@lykmapipo/env');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require('@codetanzania/majifix-priority');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* local constants */
const JURISDICTION_PATH = 'jurisdiction';
const PRIORITY_PATH = 'priority';
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE','en');
const LOCALES = getStrings('LOCALES',['en']);
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });
const OPTION_AUTOPOPULATE = {
  select: { code: 1, name: 1, color: 1 },
  maxDepth: schema.POPULATION_MAX_DEPTH
};
const {
  SERVICEGROUP_MODEL_NAME,
  JURISDICTION_MODEL_NAME,
  SERVICE_MODEL_NAME,
  SERVICEREQUEST_MODEL_NAME,
  PRIORITY_MODEL_NAME,
  getModel
} = models;


/* declarations */
const locales = _.map(LOCALES, function (locale) {
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
 * @version 1.0.0
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
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - jurisdiction population options
   * @property {object} autopopulate.select - jurisdiction fields to
   * select when populating
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  jurisdiction: {
    type: ObjectId,
    ref: JURISDICTION_MODEL_NAME,
    exists: true,
    autopopulate: Jurisdiction.OPTION_AUTOPOPULATE,
    index: true
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
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - jurisdiction population options
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  priority: {
    type: ObjectId,
    ref: PRIORITY_MODEL_NAME,
    exists: true,
    autopopulate: Priority.OPTION_AUTOPOPULATE,
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
   * @property {boolean} uppercase - force upper-casing
   * @property {boolean} index - ensure database index
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
   * @property {string[]}  locales - list of supported locales
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 1.0.0
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
   * @property {string[]}  locales - list of supported locales
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 1.0.0
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
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 1.0.0
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


/*
 *------------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------------
 */


//ensure `unique` compound index on jurisdiction, code and name
//to fix unique indexes on code and name in case they are used in more than
//one jurisdiction with different administration
_.forEach(locales, function (locale) {
  const field = `name.${locale.name}`;
  ServiceGroupSchema.index({ jurisdiction: 1, code: 1, [field]: 1 }, { unique: true });
});


/*
 *------------------------------------------------------------------------------------
 * Hooks
 *------------------------------------------------------------------------------------
 */


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


/*
 *------------------------------------------------------------------------------------
 * Instance
 *------------------------------------------------------------------------------------
 */


/**
 * @name beforeDelete
 * @function beforeDelete
 * @description pre delete service group logics
 * @param  {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
ServiceGroupSchema.methods.beforeDelete = function beforeDelete(done) {

  //restrict delete if

  async.parallel({

    //1...there are services use the group
    service: function checkServiceDependency(next) {

      //get service model
      const Service = getModel(SERVICE_MODEL_NAME);

      //check service dependency
      if (Service) {

        Service
          .count({ group: this._id }, function (error, count) {

            //warning can not delete
            if (count && count > 0) {
              const errorMessage =
                `Fail to Delete. ${count} services depend on it`;
              error = new Error(errorMessage);
            }

            //ensure error status
            if (error) {
              error.status = 400;
            }

            //return
            next(error, this);

          }.bind(this));

      }

      //continue
      else {
        next();
      }

    }.bind(this),

    //1...there are service request use the group
    serviceRequest: function checkServiceRequestDependency(next) {

      //get service request model
      const ServiceRequest = getModel(SERVICEREQUEST_MODEL_NAME);

      //check service request dependency
      if (ServiceRequest) {

        ServiceRequest
          .count({ group: this._id }, function (error, count) {

            //warning can not delete
            if (count && count > 0) {
              const errorMessage =
                `Fail to Delete. ${count} service requests depend on it`;
              error = new Error(errorMessage);
            }

            //ensure error status
            if (error) {
              error.status = 400;
            }

            //return
            next(error, this);

          }.bind(this));

      }

      //continue
      else {
        next();
      }

    }.bind(this)

  }, function (error) {
    done(error, this);
  }.bind(this));

};


/**
 * @name beforePost
 * @function beforePost
 * @description pre save service group logics
 * @param  {function} done callback to invoke on success or error
 *
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
ServiceGroupSchema.methods.beforePost = function beforePost(done) {

  //pre loads
  async.parallel({

    //1...preload jurisdiction
    jurisdiction: function preloadJurisdiction(next) {

      //ensure jurisdiction is pre loaded before post(save)
      const jurisdictionId =
        (this.jurisdiction ? this.jurisdiction._id : this.jurisdiction);

      //prefetch existing jurisdiction
      if (jurisdictionId) {

        Jurisdiction
          .getById(jurisdictionId, function (error, jurisdiction) {

            //assign existing jurisdiction
            if (jurisdiction) {
              this.jurisdiction = jurisdiction;
            }

            //return
            next(error, this);

          }.bind(this));

      }

      //continue
      else {
        next();
      }

    }.bind(this),

    //1...preload priority
    priority: function preloadPriority(next) {

      //ensure priority is pre loaded before post(save)
      const priorityId =
        (this.priority ? this.priority._id : this.priority);

      //prefetch existing priority
      if (priorityId) {

        Priority
          .getById(priorityId, function (error, priority) {

            //assign existing priority
            if (priority) {
              this.priority = priority;
            }

            //return
            next(error, this);

          }.bind(this));

      }

      //continue
      else {
        next();
      }

    }.bind(this)

  }, function (error) {
    done(error, this);
  }.bind(this));

};


/**
 * @name afterPost
 * @function afterPost
 * @description post save service group logics
 * @param  {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
ServiceGroupSchema.methods.afterPost = function afterPost(done) {

  //ensure jurisdiction is populated after post(save)
  const jurisdiction =
    _.merge({}, { path: JURISDICTION_PATH }, Jurisdiction.OPTION_AUTOPOPULATE);
  this.populate(jurisdiction);

  //ensure priority is populated after post(save)
  const priority =
    _.merge({}, { path: PRIORITY_PATH }, Priority.OPTION_AUTOPOPULATE);
  this.populate(priority, done);

};


/*
 *------------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------------
 */


/* expose static constants */
ServiceGroupSchema.statics.MODEL_NAME = SERVICEGROUP_MODEL_NAME;
ServiceGroupSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
ServiceGroupSchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;


/*
 *------------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
ServiceGroupSchema.plugin(actions);


/* export servicegroup model */
module.exports =
  mongoose.model(SERVICEGROUP_MODEL_NAME, ServiceGroupSchema);
