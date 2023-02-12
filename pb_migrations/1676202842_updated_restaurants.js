migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g1hbkoab",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // remove
  collection.schema.removeField("g1hbkoab")

  return dao.saveCollection(collection)
})
