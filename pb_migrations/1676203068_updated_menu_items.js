migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // update
  collection.schema.addField(new SchemaField({
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
        "user_id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // update
  collection.schema.addField(new SchemaField({
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
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
