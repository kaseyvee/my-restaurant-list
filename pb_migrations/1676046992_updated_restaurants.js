migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "foq46fbj",
    "name": "image",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "foq46fbj",
    "name": "picture",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})
