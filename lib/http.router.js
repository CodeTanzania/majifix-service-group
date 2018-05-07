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
 *    {
 *       "color": "#8ced78",
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "code": "05817253",
 *       "name": "O'Reilly, Reichel and Beahan",
 *       "description": "Rerum architecto asperiores natus voluptate necessitatibus quasi. Ut earum sit nulla eos aut aut occaecati. Incidunt nam inventore. Et atque placeat nostrum ex. Dicta dolor libero asperiores rerum. Sed ad veritatis earum incidunt quia eos.",
 *       "createdAt": "2018-05-07T07:24:54.490Z",
 *       "updatedAt": "2018-05-07T07:24:54.490Z",
 *       "__v": 0
 *    }
 */


/**
 * @apiDefine ServiceGroupsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c9722",
 *           "code": "40930153",
 *           "name": "Feeney - Anderson",
 *           "description": "Distinctio ut qui dolor cum ut dolore. Ad optio consectetur recusandae. Quidem non vel et. Ex distinctio repellat officia doloremque provident iusto. Natus accusamus reiciendis odio.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c9725",
 *           "code": "28848343",
 *           "name": "Turcotte - DuBuque",
 *           "description": "Ea hic ut quas est ab sapiente qui. In debitis autem magni voluptatem autem nostrum nobis. Sed tempora accusantium cum id eligendi ipsum quaerat et commodi.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c9726",
 *           "code": "18530211",
 *           "name": "Hahn Group",
 *           "description": "Debitis doloribus quia beatae. In dolorem minus autem. Veritatis nam sint delectus et.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c9723",
 *           "code": "46774444",
 *           "name": "Tillman, Emard and Mayert",
 *           "description": "Modi nostrum soluta dolorem quisquam. Impedit rerum assumenda. Non omnis repudiandae sit et expedita qui non aliquid consequuntur. Officiis facere porro.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c9724",
 *           "code": "42745025",
 *           "name": "Kihn, Kub and Kuhn",
 *           "description": "Quia eius ipsum sit est magni vel. Aut maxime vero iste eum autem. Cum totam dolorum deserunt fugiat.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c9729",
 *           "code": "14220042",
 *           "name": "Krajcik, Denesik and Wehner",
 *           "description": "Iste sint dignissimos numquam inventore nulla nostrum. Dolorem reprehenderit magni laboriosam blanditiis accusamus. Eaque beatae odio cupiditate rerum enim est voluptatum reiciendis. Nobis enim facilis exercitationem suscipit magni eligendi eaque beatae. Reprehenderit nostrum cupiditate commodi sed qui aspernatur tempore voluptatibus. Odit eos sed.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c9728",
 *           "code": "99997169",
 *           "name": "Gottlieb, McCullough and Gaylord",
 *           "description": "Quia veniam quae quia sequi quis maiores rerum. Animi nobis debitis ducimus dolorem voluptatum ut nostrum. Perspiciatis rem voluptate.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c972a",
 *           "code": "55226535",
 *           "name": "Deckow, Littel and Mosciski",
 *           "description": "Inventore qui praesentium in aliquid nihil at quae temporibus quibusdam. Architecto sit non praesentium impedit nulla. Et rerum alias praesentium. Molestiae modi aut consequuntur. Aut quia qui voluptate aut corrupti.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c9727",
 *           "code": "89479928",
 *           "name": "Reichert - Schultz",
 *           "description": "Quidem quisquam ducimus iure delectus sed nulla ut illum. Est necessitatibus qui et iusto alias veritatis qui. Recusandae sit rerum ut qui. Et corrupti ut ab. Voluptatem neque in possimus et. Et doloremque fugiat aut consequatur ipsa.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       },
 *       {
 *           "color": "#c6952b",
 *           "_id": "5aeffec376e2bc26828c972b",
 *           "code": "37199803",
 *           "name": "Johnson - Kunze",
 *           "description": "Dolorem et pariatur. Et consequatur tenetur voluptatem impedit dolor reprehenderit dolor. Ipsum neque tenetur. Facere aperiam vel debitis. Laborum illo quis et quos rerum voluptate aut qui nisi. Quibusdam hic illo soluta velit rem.",
 *           "createdAt": "2018-05-07T07:22:43.771Z",
 *           "updatedAt": "2018-05-07T07:22:43.771Z",
 *           "__v": 0
 *       }
 *   ],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-05-07T07:22:43.771Z"
 * }
 */


 /**
 * @apiDefine JWTError
 * @apiError  JWTExpired                   Authorization token has expired
 */


/**
 * @apiDefine AuthorizationHeaderError
 * @apiError  AuthorizationHeaderRequired  Authorization header is required
 */


/**
 * @apiDefine AuthorizationHeaderErrorExample
 * @apiErrorExample   {json} Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"Authorization header required",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine JWTErrorExample
 * @apiErrorExample  {json}   Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"jwt expired",
 *      "error":{}
 *    }
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
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
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
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
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
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
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
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
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
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
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
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
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