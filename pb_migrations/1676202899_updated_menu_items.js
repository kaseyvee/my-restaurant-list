migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // remove
  collection.schema.removeField("xbhldxcc")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
