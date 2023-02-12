migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vm1mp17igbo1it4")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vm1mp17igbo1it4")

  // update
  collection.schema.addField(new SchemaField({
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
        "picture"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
