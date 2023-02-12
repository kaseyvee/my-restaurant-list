migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5e2jllbn5fuz9rk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vcz1kkn7",
    "name": "restaurant_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "gmn1793fkf3r05c",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "user_id",
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5e2jllbn5fuz9rk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vcz1kkn7",
    "name": "restaurant_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "gmn1793fkf3r05c",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
