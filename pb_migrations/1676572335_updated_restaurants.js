migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "83zbyz03",
    "name": "name",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "83zbyz03",
    "name": "name",
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
