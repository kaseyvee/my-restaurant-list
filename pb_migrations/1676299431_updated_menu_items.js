migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u9grayk2",
    "name": "revieww",
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

  // remove
  collection.schema.removeField("u9grayk2")

  return dao.saveCollection(collection)
})
