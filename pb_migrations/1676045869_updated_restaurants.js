migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tbj6i4ig",
    "name": "genre",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // remove
  collection.schema.removeField("tbj6i4ig")

  // remove
  collection.schema.removeField("foq46fbj")

  return dao.saveCollection(collection)
})
