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

/**
 * @api {get} /servicegroups/schema Get ServiceGroup Schema
 * @apiVersion 1.0.0
 * @apiName GetServiceGroupSchema
 * @apiGroup ServiceGroup
 * @apiDescription Returns servicegroup json schema definition
 * @apiUse RequestHeaders
 */

/**
 * @api {get} /servicegroups/export Export ServiceGroups
 * @apiVersion 1.0.0
 * @apiName ExportServiceGroups
 * @apiGroup ServiceGroup
 * @apiDescription Export servicegroups as csv
 * @apiUse RequestHeaders
 */

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
