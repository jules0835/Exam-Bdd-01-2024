const db = require("../utils/db")

async function createCategory(category) {
  const { name } = category
  try {
    const [result] = await db.execute("CALL addCategory(?)", [name])

    const insertedId = result.insertId

    const [rows] = await db.execute("CALL getCategory(?)", [insertedId])
    return rows[0]
  } catch (err) {
    console.error("error while creating category:", err)
    throw err
  }
}

async function listCategories() {
  try {
    const [rows] = await db.execute("CALL getCategories()")
    return rows
  } catch (err) {
    console.error("error while getting categories:", err)
    throw err
  }
}

async function getCategoryById(id) {
  try {
    const [rows] = await db.execute("CALL getCategory(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while getting category by iD:", err)
    throw err
  }
}

async function updateCategory(id, category) {
  const { name } = category
  try {
    await db.execute("CALL updateCategory(?, ?)", [id, name])

    const [rows] = await db.execute("CALL getCategory(?)", [id])
    return rows[0]
    z
  } catch (err) {
    console.error("error while updating categry:", err)
    throw err
  }
}

async function deleteCategory(id) {
  try {
    await db.execute("CALL deleteCategory(?)", [id])
  } catch (err) {
    console.error("error while deleting category:", err)
    throw err
  }
}

module.exports = {
  createCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
