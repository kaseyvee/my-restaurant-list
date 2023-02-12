migrate((db) => {
  const collection = new Collection({
    "id": "5e2jllbn5fuz9rk",
    "created": "2023-02-10 16:24:36.499Z",
    "updated": "2023-02-10 16:24:36.499Z",
    "name": "saved_rec_lists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "toqagbaa",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("5e2jllbn5fuz9rk");

  return dao.deleteCollection(collection);
})
