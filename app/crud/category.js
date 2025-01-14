const db = require("../utils/db")

async function createCategory(category) {
  const { name } = category

  // Data validation
  if (!name) {
    throw new Error("Invalid category name")
  }

  try {
    const [result] = await db.execute("CALL addCategory(?)", [name])

    const insertedId = result[0][0].insertedId

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
  // Data validation
  if (!id || typeof id !== "number") {
    throw new Error("nnvalid category IfD")
  }

  try {
    const [rows] = await db.execute("CALL getCategory(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while getting category by ID:", err)
    throw err
  }
}

async function updateCategory(id, category) {
  const { name } = category

  // Data validation
  if (!id || typeof id !== "number") {
    throw new Error("Invalid category ID")
  }
  if (!name) {
    throw new Error("Invalid category name")
  }

  try {
    await db.execute("CALL updateCategory(?, ?)", [id, name])

    const [rows] = await db.execute("CALL getCategory(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("error while updating category:", err)
    throw err
  }
}
async function deleteCategory(id) {
  // Data validation
  if (!id || typeof id !== "number") {
    throw new Error("Invalid category ID")
  }

  try {
    await db.execute("CALL deleteCategory(?)", [id])
  } catch (err) {
    console.error("error while deleting category:", err)
    throw err
  }
}

async function searchCategory(query) {
  try {
    const [rows] = await db.execute("CALL searchCategory(?)", [query])
    return rows
  } catch (err) {
    console.error("error while searching category:", err)
    throw err
  }
}

module.exports = {
  createCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  searchCategory,
  deleteCategory,
}
