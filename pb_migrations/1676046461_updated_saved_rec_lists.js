migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5e2jllbn5fuz9rk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vcz1kkn7",
    "name": "rec_list_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "vm1mp17igbo1it4",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
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
      "displayFields": [
        "username"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5e2jllbn5fuz9rk")

  // remove
  collection.schema.removeField("vcz1kkn7")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
