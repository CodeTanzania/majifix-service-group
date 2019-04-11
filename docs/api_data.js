define({ "api": [
  {
    "type": "delete",
    "url": "/servicegroups/:id",
    "title": "Delete Existing Service Group",
    "version": "1.0.0",
    "name": "DeleteServiceGroup",
    "group": "ServiceGroup",
    "description": "<p>Delete existing service group</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-service-group.herokuapp.com/v1/servicegroups/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique service group identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this service group belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>A unique identifier of the service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>A unique human readable name of the service group e.g Sanitation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description.en",
            "description": "<p>A detailed human readable explanation about the service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate a service group visually from other service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when service group was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when service group was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aefff461e0a5527eb1955bd\",\n   \"jurisdiction\": {\n     \"_id\": \"5af2fe3ea937a3238bd8e64b\",\n     \"code\": \"66514685\",\n     \"name\": \"Gana\"\n   },\n   \"code\": \"05817253\",\n   \"name\": {\n     \"en\": \"Rowe\"\n   },\n   \"description\": {\n     \"en\": \"Eos aut non non delectus dolor eos\".\n   },\n   \"color\": \"#8ced78\",\n   \"createdAt\": \"2018-05-07T07:24:54.490Z\",\n   \"updatedAt\": \"2018-05-07T07:24:54.490Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/jurisdictions/:jurisdiction/servicegroups",
    "title": "List Jurisdiction Service Groups",
    "version": "1.0.0",
    "name": "GetJurisdictionServiceGroups",
    "group": "ServiceGroup",
    "description": "<p>Returns a list of servicegroups of specified jurisdiction</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-service-group.herokuapp.com/v1/jurisdictions/:jurisdiction/servicegroups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of service groups</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique service group identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this service group belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code",
            "description": "<p>A unique identifier of the service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name.en",
            "description": "<p>A unique human readable name of the service group e.g Sanitation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.description.en",
            "description": "<p>A detailed human readable explanation about the service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate a service group visually from other service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when service group was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when service group was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of service group returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest service group was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n    {\n      \"_id\": \"5aefff461e0a5527eb1955bd\",\n      \"jurisdiction\": {\n        \"_id\": \"5af2fe3ea937a3238bd8e64b\",\n        \"code\": \"66514685\",\n        \"name\": \"Gana\"\n      },\n      \"code\": \"05817253\",\n      \"name\": {\n        \"en\": \"Rowe\"\n      },\n      \"description\": {\n        \"en\": \"Eos aut non non delectus dolor eos\".\n      },\n      \"color\": \"#8ced78\",\n      \"createdAt\": \"2018-05-07T07:24:54.490Z\",\n      \"updatedAt\": \"2018-05-07T07:24:54.490Z\"\n   }\n  ],\n  \"total\": 10,\n  \"size\": 1,\n  \"limit\": 1,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 10,\n  \"lastModified\": \"2018-05-07T07:22:43.771Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/servicegroups/:id",
    "title": "Get Existing Service Group",
    "version": "1.0.0",
    "name": "GetServiceGroup",
    "group": "ServiceGroup",
    "description": "<p>Get existing service group</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-service-group.herokuapp.com/v1/servicegroups/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique service group identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this service group belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>A unique identifier of the service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>A unique human readable name of the service group e.g Sanitation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description.en",
            "description": "<p>A detailed human readable explanation about the service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate a service group visually from other service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when service group was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when service group was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aefff461e0a5527eb1955bd\",\n   \"jurisdiction\": {\n     \"_id\": \"5af2fe3ea937a3238bd8e64b\",\n     \"code\": \"66514685\",\n     \"name\": \"Gana\"\n   },\n   \"code\": \"05817253\",\n   \"name\": {\n     \"en\": \"Rowe\"\n   },\n   \"description\": {\n     \"en\": \"Eos aut non non delectus dolor eos\".\n   },\n   \"color\": \"#8ced78\",\n   \"createdAt\": \"2018-05-07T07:24:54.490Z\",\n   \"updatedAt\": \"2018-05-07T07:24:54.490Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/servicegroups",
    "title": "List Service Groups",
    "version": "1.0.0",
    "name": "GetServiceGroups",
    "group": "ServiceGroup",
    "description": "<p>Returns a list of service groups</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-service-group.herokuapp.com/v1/servicegroups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of service groups</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique service group identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this service group belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code",
            "description": "<p>A unique identifier of the service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name.en",
            "description": "<p>A unique human readable name of the service group e.g Sanitation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.description.en",
            "description": "<p>A detailed human readable explanation about the service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate a service group visually from other service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when service group was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when service group was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of service group returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest service group was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n    {\n      \"_id\": \"5aefff461e0a5527eb1955bd\",\n      \"jurisdiction\": {\n        \"_id\": \"5af2fe3ea937a3238bd8e64b\",\n        \"code\": \"66514685\",\n        \"name\": \"Gana\"\n      },\n      \"code\": \"05817253\",\n      \"name\": {\n        \"en\": \"Rowe\"\n      },\n      \"description\": {\n        \"en\": \"Eos aut non non delectus dolor eos\".\n      },\n      \"color\": \"#8ced78\",\n      \"createdAt\": \"2018-05-07T07:24:54.490Z\",\n      \"updatedAt\": \"2018-05-07T07:24:54.490Z\"\n   }\n  ],\n  \"total\": 10,\n  \"size\": 1,\n  \"limit\": 1,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 10,\n  \"lastModified\": \"2018-05-07T07:22:43.771Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/servicegroups/:id",
    "title": "Patch Existing Service Group",
    "version": "1.0.0",
    "name": "PatchServiceGroup",
    "group": "ServiceGroup",
    "description": "<p>Patch existing service group</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-service-group.herokuapp.com/v1/servicegroups/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique service group identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this service group belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>A unique identifier of the service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>A unique human readable name of the service group e.g Sanitation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description.en",
            "description": "<p>A detailed human readable explanation about the service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate a service group visually from other service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when service group was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when service group was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aefff461e0a5527eb1955bd\",\n   \"jurisdiction\": {\n     \"_id\": \"5af2fe3ea937a3238bd8e64b\",\n     \"code\": \"66514685\",\n     \"name\": \"Gana\"\n   },\n   \"code\": \"05817253\",\n   \"name\": {\n     \"en\": \"Rowe\"\n   },\n   \"description\": {\n     \"en\": \"Eos aut non non delectus dolor eos\".\n   },\n   \"color\": \"#8ced78\",\n   \"createdAt\": \"2018-05-07T07:24:54.490Z\",\n   \"updatedAt\": \"2018-05-07T07:24:54.490Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/servicegroups",
    "title": "Create New Service Group",
    "version": "1.0.0",
    "name": "PostServiceGroup",
    "group": "ServiceGroup",
    "description": "<p>Create new service group</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-service-group.herokuapp.com/v1/servicegroups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique service group identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this service group belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>A unique identifier of the service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>A unique human readable name of the service group e.g Sanitation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description.en",
            "description": "<p>A detailed human readable explanation about the service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate a service group visually from other service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when service group was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when service group was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aefff461e0a5527eb1955bd\",\n   \"jurisdiction\": {\n     \"_id\": \"5af2fe3ea937a3238bd8e64b\",\n     \"code\": \"66514685\",\n     \"name\": \"Gana\"\n   },\n   \"code\": \"05817253\",\n   \"name\": {\n     \"en\": \"Rowe\"\n   },\n   \"description\": {\n     \"en\": \"Eos aut non non delectus dolor eos\".\n   },\n   \"color\": \"#8ced78\",\n   \"createdAt\": \"2018-05-07T07:24:54.490Z\",\n   \"updatedAt\": \"2018-05-07T07:24:54.490Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/servicegroups/:id",
    "title": "Put Existing Service Group",
    "version": "1.0.0",
    "name": "PutServiceGroup",
    "group": "ServiceGroup",
    "description": "<p>Put existing service group</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-service-group.herokuapp.com/v1/servicegroups/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique service group identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this service group belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>A unique identifier of the service group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>A unique human readable name of the service group e.g Sanitation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description.en",
            "description": "<p>A detailed human readable explanation about the service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate a service group visually from other service group.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when service group was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when service group was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aefff461e0a5527eb1955bd\",\n   \"jurisdiction\": {\n     \"_id\": \"5af2fe3ea937a3238bd8e64b\",\n     \"code\": \"66514685\",\n     \"name\": \"Gana\"\n   },\n   \"code\": \"05817253\",\n   \"name\": {\n     \"en\": \"Rowe\"\n   },\n   \"description\": {\n     \"en\": \"Eos aut non non delectus dolor eos\".\n   },\n   \"color\": \"#8ced78\",\n   \"createdAt\": \"2018-05-07T07:24:54.490Z\",\n   \"updatedAt\": \"2018-05-07T07:24:54.490Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  }
] });