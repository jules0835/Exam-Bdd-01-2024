const express = require("express")
const { createClient, listClients } = require("../crud/client")

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const clientData = req.body
    const result = await createClient(clientData)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const result = await listClients()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
