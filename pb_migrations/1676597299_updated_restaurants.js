migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  collection.createRule = "@request.auth.id != \"\""
  collection.deleteRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gmn1793fkf3r05c")

  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
