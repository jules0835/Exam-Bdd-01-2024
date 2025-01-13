const express = require("express")
const {
  createSupplier,
  listSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getSupplierProducts,
  searchSupplier,
} = require("../crud/supplier")

const router = express.Router()

router.post("/supplier", async (req, res) => {
  try {
    const supplierData = req.body
    const result = await createSupplier(supplierData)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "error creating supplier with provided informations",
    })
  }
})

router.get("/supplier", async (req, res) => {
  try {
    const result = await listSuppliers()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error fetching suppliers from datab",
    })
  }
})

router.get("/supplier/:id", async (req, res) => {
  try {
    const result = await getSupplierById(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error fetching supplier" })
  }
})

router.put("/supplier/:id", async (req, res) => {
  try {
    const result = await updateSupplier(req.params.id, req.body)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ errorDetails: error.message, message: "Error updting supplier" })
  }
})

router.delete("/supplier/:id", async (req, res) => {
  try {
    const result = await deleteSupplier(req.params.id)
    res.status(204).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Eror while deleting the supplier  from the db",
    })
  }
})

router.get("/supplier/:id/products", async (req, res) => {
  try {
    const result = await getSupplierProducts(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error fetching supplier products",
    })
  }
})

router.get("/search/supplier", async (req, res) => {
  try {
    const { q } = req.query
    const result = await searchSupplier(q)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error searching for supplier",
    })
  }
})

module.exports = router
