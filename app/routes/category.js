const express = require("express")
const {
  createCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../crud/category")

const router = express.Router()

router.post("/category", async (req, res) => {
  try {
    const categoryData = req.body
    const result = await createCategory(categoryData)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      error: "error creating category with provided information",
    })
  }
})

router.get("/category", async (req, res) => {
  try {
    const result = await listCategories()
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, error: "Error getting categorys from db" })
  }
})

router.get("/category/:id", async (req, res) => {
  try {
    const result = await getCategoryById(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, error: "Error getting category" })
  }
})

router.put("/category/:id", async (req, res) => {
  try {
    const result = await updateCategory(req.params.id, req.body)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ errorDetails: error.message, error: "Error updating category" })
  }
})

router.delete("/category/:id", async (req, res) => {
  try {
    const result = await deleteCategory(req.params.id)
    res.status(204).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      error: "error while deleting the category the db",
    })
  }
})

router.get("/category/search", async (req, res) => {
  try {
    const { q } = req.query
    const result = await searchCategory(q)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      error: "Error searching for category",
    })
  }
})

module.exports = router
