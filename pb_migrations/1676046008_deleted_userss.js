migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("knt2ppqoili6q9u");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "knt2ppqoili6q9u",
    "created": "2023-02-10 16:19:52.583Z",
    "updated": "2023-02-10 16:19:52.583Z",
    "name": "userss",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "olrgvdvv",
        "name": "username",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nghlh9co",
        "name": "email",
        "type": "email",
        "required": true,
        "unique": true,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      },
      {
        "system": false,
        "id": "zzott6dv",
        "name": "password",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 8,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ojz6j33p",
        "name": "picture",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
