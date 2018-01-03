'use strict';


/**
 * @module ServiceGroup
 * @name ServiceGroup
 * @description Provide ability to group service offered by a jurisdiction(s)
 *              into meaningful categories e.g Sanitation
 *
 *              It provides a way to group several service request types
 *              (issues) under meaningful categories such as Sanitation,
 *              Commercial, Billing, Non-Commercial etc.
 *
 * @see {@link Jurisdiction}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


//dependencies
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const randomColor = require('randomcolor');
const mongooseExists = require('mongoose-exists');
const mongooseAutoset = require('mongoose-autoset');
const mongooseRegexSearch = require('mongoose-regex-search');
const mongoosePaginate = require('express-mquery').plugin;
const mongooseShow =
  require(path.join(__dirname, '..', 'libs', 'mongoose', 'show'));
const mongooseEdit =
  require(path.join(__dirname, '..', 'libs', 'mongoose', 'edit'));
const mongooseList =
  require(path.join(__dirname, '..', 'libs', 'mongoose', 'list'));
const mongooseReload =
  require(path.join(__dirname, '..', 'libs', 'mongoose', 'reload'));
const mongooseSoftDelete =
  require(path.join(__dirname, '..', 'libs', 'mongoose', 'soft_delete'));
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


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
   *              If not available a service group is applicable to all
   *              jurisdictions.
   *
   * @type {Object}
   * @see {@link Jurisdiction}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  jurisdiction: {
    type: ObjectId,
    ref: 'Jurisdiction',
    autoset: true,
    exists: true,
    index: true
  },


  /**
   * @name code
   * @description A unique identifier of the service group.
   *
   *              Used in deriving code of the service request(issue) and
   *              internal jurisdiction usage i.e act as an issue
   *              identifier.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  code: {
    type: String,
    // unique: true, see index section below for compound index
    // used to enforce uniqueness
    required: true,
    trim: true,
    index: true,
    searchable: true
  },


  /**
   * @name name
   * @description A unique human readable name of the service group
   *              e.g Sanitation
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  name: {
    type: String,
    // unique: true, see index section below for compound index
    // used to enforce uniqueness
    required: true,
    trim: true,
    index: true,
    searchable: true
  },


  /**
   * @name description
   * @description A detailed human readable explanation about the service
   *              group.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  description: {
    type: String,
    trim: true,
    searchable: true
  },


  /**
   * @name color
   * @description A color code(in hexadecimal format) eg. #363636 used to
   *              differentiate a service group visually from other service
   *              group.
   *
   *              If not provided it will randomly generated, but it is not
   *              guarantee its visual appeal.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  color: {
    type: String,
    uppercase: true,
    trim: true
  }

}, {
  timestamps: true,
  emitIndexErrors: true
});


//-----------------------------------------------------------------------------
// ServiceGroupSchema Index
//-----------------------------------------------------------------------------


//ensure `unique` compound index on jurisdiction, name and code
//to fix unique indexes on code and name in case they are used in more than
//one jurisdiction with different administration
ServiceGroupSchema.index({
  jurisdiction: 1,
  name: 1,
  code: 1
}, {
  unique: true
});


//-----------------------------------------------------------------------------
// ServiceGroupSchema Hooks
//-----------------------------------------------------------------------------
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

// plugins
ServiceGroupSchema.plugin(mongooseExists);
ServiceGroupSchema.plugin(mongooseAutoset);
ServiceGroupSchema.plugin(mongooseRegexSearch);
ServiceGroupSchema.plugin(mongooseShow);
ServiceGroupSchema.plugin(mongooseEdit);
ServiceGroupSchema.plugin(mongooseReload);
ServiceGroupSchema.plugin(mongooseList);
ServiceGroupSchema.plugin(mongooseSoftDelete);
ServiceGroupSchema.plugin(mongoosePaginate);

/**
 * @name ServiceGroup
 * @description register ServiceGroupSchema and initialize ServiceGroup
 *              model
 * @type {Model}
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
module.exports = mongoose.model('ServiceGroup', ServiceGroupSchema);