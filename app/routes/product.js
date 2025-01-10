const express = require("express")
const {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
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

router.get("/product/id", async (req, res) => {
  try {
    const id = req.query.id
    console.log("id", id)
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

module.exports = router
