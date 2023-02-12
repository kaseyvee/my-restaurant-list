migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "guk3i1lv",
    "name": "three_stars",
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
  collection.schema.removeField("guk3i1lv")

  return dao.saveCollection(collection)
})
