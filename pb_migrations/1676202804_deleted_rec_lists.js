migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vm1mp17igbo1it4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "vm1mp17igbo1it4",
    "created": "2023-02-10 16:26:47.418Z",
    "updated": "2023-02-10 16:36:32.493Z",
    "name": "rec_lists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qlu7gdug",
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
      },
      {
        "system": false,
        "id": "87rqwx7h",
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
            "image"
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
})
