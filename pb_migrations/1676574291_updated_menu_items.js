migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u9grayk2",
    "name": "notes",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u9grayk2",
    "name": "review",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
