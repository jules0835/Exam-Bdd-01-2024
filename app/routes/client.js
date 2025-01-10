const express = require("express")
const {
  createClient,
  listClients,
  getClientById,
  updateClient,
  deleteClient,
  listClientCommands,
} = require("../crud/client")

const router = express.Router()

router.post("/client", async (req, res) => {
  try {
    const clientData = req.body
    const result = await createClient(clientData)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      error: "Error creating client <ith provided informations",
    })
  }
})

router.get("/client", async (req, res) => {
  try {
    const result = await listClients()
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, error: "Error getting client frlm db" })
  }
})

router.get("/client/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log("id received:", id)
    const result = await getClientById(id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error getting client",
    })
  }
})

router.put("/client/:id", async (req, res) => {
  try {
    const result = await updateClient(req.params.id, req.body)
    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ errorDetails: error.message, error: "Error updatin client" })
  }
})

router.delete("/client/:id", async (req, res) => {
  try {
    const result = await deleteClient(req.params.id)
    res.status(204).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      error: "Error while deleting the client frome the db",
    })
  }
})

router.get("/client/:id/commands", async (req, res) => {
  try {
    const result = await listClientCommands(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error getting client commands",
    })
  }
})

module.exports = router
