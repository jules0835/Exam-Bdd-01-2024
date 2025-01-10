const db = require("../utils/db")

async function createCategory(category) {
  const { name } = category
  try {
    const query = "INSERT INTO category (name) VALUES ('" + name + "')"
    const [result] = await db.execute(query)
    const insertedId = result.insertId

    const querySelect = "SELECT * FROM category WHERE id = " + insertedId
    const [rows] = await db.execute(querySelect)
    return rows[0]
  } catch (err) {
    console.error("error while creating category:", err)
    throw err
  }
}

async function listCategories() {
  try {
    const [rows] = await db.execute("SELECT * FROM category")
    return rows
  } catch (err) {
    console.error("error while getting categories:", err)
    throw err
  }
}

async function getCategoryById(id) {
  try {
    const [rows] = await db.execute("SELECT * FROM category WHERE id = ?", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while getting category by iD:", err)
    throw err
  }
}

async function updateCategory(id, category) {
  const { name } = category
  try {
    const query = "UPDATE category SET name = '" + name + "' WHERE id = " + id
    await db.execute(query)

    const querySelect = "SELECT * FROM category WHERE id = " + id
    const [rows] = await db.execute(querySelect)
    return rows[0]
  } catch (err) {
    console.error("error while updating categry:", err)
    throw err
  }
}

async function deleteCategory(id) {
  try {
    await db.execute("DELETE FROM category WHERE id = ?", [id])
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
