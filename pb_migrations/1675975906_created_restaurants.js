migrate((db) => {
  const collection = new Collection({
    "id": "gmn1793fkf3r05c",
    "created": "2023-02-09 20:51:46.433Z",
    "updated": "2023-02-09 20:51:46.433Z",
    "name": "restaurants",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "83zbyz03",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cslzlyaj",
        "name": "address",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c");

  return dao.deleteCollection(collection);
})
