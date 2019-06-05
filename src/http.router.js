/**
 * @apiDefine ServiceGroup  ServiceGroup
 *
 * @apiDescription A representation of an entity that group service
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

/**
 * @apiDefine ServiceGroup
 * @apiSuccess {String} _id Unique service group identifier
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under
 * which this service group belongs
 * @apiSuccess {String} code A unique identifier of the service group
 * @apiSuccess {Object} name
 * @apiSuccess {String} name.en A unique human readable name of
 * the service group e.g Sanitation.
 * @apiSuccess {Object} description
 * @apiSuccess {String} description.en A detailed human readable
 * explanation about the service group.
 * @apiSuccess {String} color A color code(in hexadecimal format)
 * eg. #363636 used to differentiate a service group visually from
 * other service group.
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
 * @apiSuccess {String} data.code A unique identifier of the service group
 * @apiSuccess {Object} data.name
 * @apiSuccess {String} data.name.en A unique human readable name of
 * the service group e.g Sanitation.
 * @apiSuccess {Object} data.description
 * @apiSuccess {String} data.description.en A detailed human readable
 * explanation about the service group.
 * @apiSuccess {String} data.color A color code(in hexadecimal format)
 * eg. #363636 used to differentiate a service group visually from
 * other service group.
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
 *    {
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "jurisdiction": {
 *         "_id": "5af2fe3ea937a3238bd8e64b",
 *         "code": "66514685",
 *         "name": "Gana"
 *       },
 *       "code": "05817253",
 *       "name": {
 *         "en": "Rowe"
 *       },
 *       "description": {
 *         "en": "Eos aut non non delectus dolor eos".
 *       },
 *       "color": "#8ced78",
 *       "createdAt": "2018-05-07T07:24:54.490Z",
 *       "updatedAt": "2018-05-07T07:24:54.490Z"
 *    }
 */

/**
 * @apiDefine ServiceGroupsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *     {
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "jurisdiction": {
 *         "_id": "5af2fe3ea937a3238bd8e64b",
 *         "code": "66514685",
 *         "name": "Gana"
 *       },
 *       "code": "05817253",
 *       "name": {
 *         "en": "Rowe"
 *       },
 *       "description": {
 *         "en": "Eos aut non non delectus dolor eos".
 *       },
 *       "color": "#8ced78",
 *       "createdAt": "2018-05-07T07:24:54.490Z",
 *       "updatedAt": "2018-05-07T07:24:54.490Z"
 *    }
 *   ],
 *   "total": 10,
 *   "size": 1,
 *   "limit": 1,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 10,
 *   "lastModified": "2018-05-07T07:22:43.771Z"
 * }
 */

/* dependencies */
import _ from 'lodash';
import { getString } from '@lykmapipo/env';
import { Router } from '@lykmapipo/express-common';
import ServiceGroup from './servicegroup.model';

/* local constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_LIST = '/servicegroups';
const PATH_SINGLE = '/servicegroups/:id';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/servicegroups';

/* declarations */
const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /servicegroups List Service Groups
 * @apiVersion 1.0.0
 * @apiName GetServiceGroups
 * @apiGroup ServiceGroup
 * @apiDescription Returns a list of service groups
 * @apiUse RequestHeaders
 * @apiUse ServiceGroups
 *
 * @apiUse RequestHeadersExample
 * @apiUse ServiceGroupsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getServiceGroups(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  ServiceGroup.get(options, function onGetServiceGroups(error, results) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @api {post} /servicegroups Create New Service Group
 * @apiVersion 1.0.0
 * @apiName PostServiceGroup
 * @apiGroup ServiceGroup
 * @apiDescription Create new service group
 * @apiUse RequestHeaders
 * @apiUse ServiceGroup
 *
 * @apiUse RequestHeadersExample
 * @apiUse ServiceGroupSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postServiceGroup(request, response, next) {
  // obtain request body
  const body = _.merge({}, request.body);

  ServiceGroup.post(body, function onPostServiceGroup(error, created) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(201);
      response.json(created);
    }
  });
});

/**
 * @api {get} /servicegroups/:id Get Existing Service Group
 * @apiVersion 1.0.0
 * @apiName GetServiceGroup
 * @apiGroup ServiceGroup
 * @apiDescription Get existing service group
 * @apiUse RequestHeaders
 * @apiUse ServiceGroup
 *
 * @apiUse RequestHeadersExample
 * @apiUse ServiceGroupSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getServiceGroup(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain service group id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  ServiceGroup.getById(options, function onGetServiceGroup(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

/**
 * @api {patch} /servicegroups/:id Patch Existing Service Group
 * @apiVersion 1.0.0
 * @apiName PatchServiceGroup
 * @apiGroup ServiceGroup
 * @apiDescription Patch existing service group
 * @apiUse RequestHeaders
 * @apiUse ServiceGroup
 *
 * @apiUse RequestHeadersExample
 * @apiUse ServiceGroupSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchServiceGroup(request, response, next) {
  // obtain service group id
  const { id } = request.params;

  // obtain request body
  const patches = _.merge({}, request.body);

  ServiceGroup.patch(id, patches, function onPatchServiceGroup(error, patched) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(patched);
    }
  });
});

/**
 * @api {put} /servicegroups/:id Put Existing Service Group
 * @apiVersion 1.0.0
 * @apiName PutServiceGroup
 * @apiGroup ServiceGroup
 * @apiDescription Put existing service group
 * @apiUse RequestHeaders
 * @apiUse ServiceGroup
 *
 * @apiUse RequestHeadersExample
 * @apiUse ServiceGroupSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putServiceGroup(request, response, next) {
  // obtain service group id
  const { id } = request.params.id;

  // obtain request body
  const updates = _.merge({}, request.body);

  ServiceGroup.put(id, updates, function onPutServiceGroup(error, updated) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(updated);
    }
  });
});

/**
 * @api {delete} /servicegroups/:id Delete Existing Service Group
 * @apiVersion 1.0.0
 * @apiName DeleteServiceGroup
 * @apiGroup ServiceGroup
 * @apiDescription Delete existing service group
 * @apiUse RequestHeaders
 * @apiUse ServiceGroup
 *
 * @apiUse RequestHeadersExample
 * @apiUse ServiceGroupSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteServiceGroup(
  request,
  response,
  next
) {
  // obtain service group id
  const { id } = request.params;

  ServiceGroup.del(id, function onDeleteServiceGroup(error, deleted) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(deleted);
    }
  });
});

/**
 * @api {get} /jurisdictions/:jurisdiction/servicegroups List Jurisdiction Service Groups
 * @apiVersion 1.0.0
 * @apiName GetJurisdictionServiceGroups
 * @apiGroup ServiceGroup
 * @apiDescription Returns a list of servicegroups of specified jurisdiction
 * @apiUse RequestHeaders
 * @apiUse ServiceGroups
 *
 * @apiUse RequestHeadersExample
 * @apiUse ServiceGroupsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_JURISDICTION, function getServiceGroups(
  request,
  response,
  next
) {
  // obtain request options
  const { jurisdiction } = request.params;
  const filter = jurisdiction ? { filter: { jurisdiction } } : {}; // TODO support parent and no jurisdiction
  const options = _.merge({}, filter, request.mquery);

  ServiceGroup.get(options, function onGetServiceGroups(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

/* expose router */
export default router;
