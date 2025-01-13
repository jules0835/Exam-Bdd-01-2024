const express = require("express")
const {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  listCommandsByProductId,
  getLowStockProducts,
  searchProduct,
} = require("../crud/product")

const router = express.Router()

router.post("/product", async (req, res) => {
  try {
    const productData = req.body
    const result = await createProduct(productData)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error with creating product with provided information",
    })
  }
})

router.get("/product", async (req, res) => {
  try {
    const result = await listProducts()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error fetching products from db",
    })
  }
})

router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params
    const result = await getProductById(id)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error while fetching product" })
  }
})

router.put("/product/:id", async (req, res) => {
  try {
    const result = await updateProduct(req.params.id, req.body)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      errorDetails: error.message,
      message: "Error updating the product",
    })
  }
})

router.delete("/product/:id", async (req, res) => {
  try {
    const result = await deleteProduct(req.params.id)
    res.status(204).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "error while deleting the product from the db",
    })
  }
})

router.get("/product/:id/command", async (req, res) => {
  try {
    const result = await listCommandsByProductId(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error fetching commands by product ID",
    })
  }
})

router.get("/search/product", async (req, res) => {
  try {
    const { q } = req.query
    const result = await searchProduct(q)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error fetching products by name and category",
    })
  }
})

router.get("/stock/notification", async (req, res) => {
  try {
    const { seuil } = req.query
    const result = await getLowStockProducts(seuil)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error fetching products with low stock",
    })
  }
})

module.exports = router
