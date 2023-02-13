migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // remove
  collection.schema.removeField("enzsrpz6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ip0abuz",
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
  const collection = dao.findCollectionByNameOrId("jgdv3sv1pk0xd4i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "enzsrpz6",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  // remove
  collection.schema.removeField("3ip0abuz")

  return dao.saveCollection(collection)
})
