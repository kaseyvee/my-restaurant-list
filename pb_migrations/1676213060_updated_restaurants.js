migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ojcqrzu5",
    "name": "one_stars",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uwkimvkz",
    "name": "two_stars",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // remove
  collection.schema.removeField("ojcqrzu5")

  // remove
  collection.schema.removeField("uwkimvkz")

  return dao.saveCollection(collection)
})
