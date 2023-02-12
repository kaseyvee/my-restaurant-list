migrate((db) => {
  const collection = new Collection({
    "id": "jgdv3sv1pk0xd4i",
    "created": "2023-02-10 16:36:11.766Z",
    "updated": "2023-02-10 16:36:11.766Z",
    "name": "menu_items",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "x5ursopj",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "yutlqtu9",
        "name": "review",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "hyj4pwy4",
        "name": "rating",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 3
        }
      },
      {
        "system": false,
        "id": "k4rqv0vj",
        "name": "image",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "ehf6vinr",
        "name": "restaurant_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "gmn1793fkf3r05c",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": [
            "name",
            "address",
            "genre",
            "picture"
          ]
        }
      },
      {
        "system": false,
        "id": "xbhldxcc",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": [
            "username"
          ]
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i");

  return dao.deleteCollection(collection);
})
