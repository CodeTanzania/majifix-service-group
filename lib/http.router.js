'use strict';


/**
 * @module majifix-service-group
 * @apiDefine ServiceGroup  ServiceGroup
 *
 * @apiDescription A representation of an entity that group service 
 * offered by a jurisdiction(s) into meaningful categories e.g Sanitation.
 *
 * It provides a way to group several service request types 
 * (issues) under meaningful categories such as Sanitation, 
 * Commercial, Billing, Non-Commercial etc.
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine ServiceGroup
 * @apiSuccess {String} _id Unique service group identifier
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under
 * which this service group belongs
 * @apiSuccess {Date} createdAt Date when service group was created
 * @apiSuccess {Date} updatedAt Date when service group was last updated
 *
 */


/**
 * @apiDefine ServiceGroups
 * @apiSuccess {Object[]} data List of service groups
 * @apiSuccess {String} data._id Unique service group identifier
 * @apiSuccess {String} [data.jurisdiction = undefined] jurisdiction under
 * which this service group belongs
 * @apiSuccess {Date} data.createdAt Date when service group was created
 * @apiSuccess {Date} data.updatedAt Date when service group was last updated
 * @apiSuccess {Number} total Total number of service group
 * @apiSuccess {Number} size Number of service group returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest service group
 * was last modified
 *
 */


/**
 * @apiDefine ServiceGroupSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *
 */


/**
 * @apiDefine ServiceGroupsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * 
 */


/**
 * @apiDefine ServiceGroupRequestHeader
 *
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * 
 */


/**
 * @apiDefine ServiceGroupRequestHeaderExample
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;


/* local constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';


/* declarations */
const ServiceGroup = require(path.join(__dirname, 'servicegroup.model'));
const router = new Router({
  version: API_VERSION
});


/* expose service group model */
Object.defineProperty(router, 'Model', {
  get() {
    return ServiceGroup;
  }
});



/**
 * @api {get} /servicegroups List ServiceGroups
 * @apiVersion 1.0.0
 * @apiName GetServiceGroups
 * @apiGroup ServiceGroup
 *
 * @apiDescription Returns a list of servicegroups
 *
 * @apiUse ServiceGroupRequestHeader
 *
 * @apiUse ServiceGroups
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-group.herokuapp.com/v1.0.0/servicegroups
 *
 * @apiUse ServiceGroupRequestHeaderExample
 *
 * @apiUse ServiceGroupsSuccessResponse
 *
 */
router.get('/servicegroups', function getServiceGroups(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  ServiceGroup
    .get(options, function onGetServiceGroups(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});



/**
 * @api {post} /servicegroups Create New ServiceGroup
 * @apiVersion 1.0.0
 * @apiName PostServiceGroup
 * @apiGroup ServiceGroup
 *
 * @apiDescription Create new service group
 *
 * @apiUse ServiceGroupRequestHeader
 *
 * @apiUse ServiceGroup
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-group.herokuapp.com/v1.0.0/servicegroups
 *
 * @apiUse ServiceGroupRequestHeaderExample
 *
 * @apiUse ServiceGroupSuccessResponse
 *
 */
router.post('/servicegroups', function postServiceGroup(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  ServiceGroup
    .post(body, function onPostServiceGroup(error, created) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});



/**
 * @api {get} /servicegroups/:id Get Existing ServiceGroup
 * @apiVersion 1.0.0
 * @apiName GetServiceGroup
 * @apiGroup ServiceGroup
 *
 * @apiDescription Get existing service group
 *
 * @apiUse ServiceGroupRequestHeader
 *
 * @apiUse ServiceGroup
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-group.herokuapp.com/v1.0.0/servicegroups
 *
 * @apiUse ServiceGroupRequestHeaderExample
 *
 * @apiUse ServiceGroupSuccessResponse
 *
 */
router.get('/servicegroups/:id', function getServiceGroup(request, response,
  next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain service group id
  options._id = request.params.id;

  ServiceGroup
    .getById(options, function onGetServiceGroup(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /servicegroups/:id Patch Existing ServiceGroup
 * @apiVersion 1.0.0
 * @apiName PatchServiceGroup
 * @apiGroup ServiceGroup
 *
 * @apiDescription Patch existing service group
 *
 * @apiUse ServiceGroupRequestHeader
 *
 * @apiUse ServiceGroup
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-group.herokuapp.com/v1.0.0/servicegroups
 *
 * @apiUse ServiceGroupRequestHeaderExample
 *
 * @apiUse ServiceGroupSuccessResponse
 *
 */
router.patch('/servicegroups/:id', function patchServiceGroup(request, response,
  next) {

  //obtain service group id
  const _id = request.params.id;

  //obtain request body
  const patches = _.merge({}, request.body);

  ServiceGroup
    .patch(_id, patches, function onPatchServiceGroup(error, patched) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});



/**
 * @api {put} /servicegroups/:id Put Existing ServiceGroup
 * @apiVersion 1.0.0
 * @apiName PutServiceGroup
 * @apiGroup ServiceGroup
 *
 * @apiDescription Put existing service group
 *
 * @apiUse ServiceGroupRequestHeader
 *
 * @apiUse ServiceGroup
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-group.herokuapp.com/v1.0.0/servicegroups
 *
 * @apiUse ServiceGroupRequestHeaderExample
 *
 * @apiUse ServiceGroupSuccessResponse
 *
 */
router.put('/servicegroups/:id', function putServiceGroup(request, response,
  next) {

  //obtain service group id
  const _id = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.body);

  ServiceGroup
    .put(_id, updates, function onPutServiceGroup(error, updated) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});



/**
 * @api {delete} /servicegroups/:id Delete Existing ServiceGroup
 * @apiVersion 1.0.0
 * @apiName DeleteServiceGroup
 * @apiGroup ServiceGroup
 *
 * @apiDescription Delete existing service group
 *
 * @apiUse ServiceGroupRequestHeader
 *
 * @apiUse ServiceGroup
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-group.herokuapp.com/v1.0.0/servicegroups
 *
 * @apiUse ServiceGroupRequestHeaderExample
 *
 * @apiUse ServiceGroupSuccessResponse
 *
 */
router.delete('/servicegroups/:id', function deleteServiceGroup(request,
  response, next) {

  //obtain service group id
  const _id = request.params.id;

  ServiceGroup
    .del(_id, function onDeleteServiceGroup(error, deleted) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});


/* expose router */
module.exports = router;