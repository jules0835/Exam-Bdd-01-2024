const express = require("express")
const {
  createCommand,
  listCommands,
  getCommandById,
  updateCommand,
  deleteCommand,
} = require("../crud/command")

const router = express.Router()

router.post("/command", async (req, res) => {
  try {
    const commandData = req.body
    const result = await createCommand(commandData)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error creating command with provided information",
    })
  }
})

router.get("/command", async (req, res) => {
  try {
    const result = await listCommands()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error fetching commands from the database",
    })
  }
})

router.get("/command/id", async (req, res) => {
  try {
    const id = req.query.id
    console.log("id received:", id)
    const result = await getCommandById(id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error fetching command by ID",
    })
  }
})

router.put("/command/:id", async (req, res) => {
  try {
    const result = await updateCommand(req.params.id, req.body)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      errorDetails: error.message,
      message: "Error updating the command",
    })
  }
})

router.delete("/command/:id", async (req, res) => {
  try {
    const result = await deleteCommand(req.params.id)
    res.status(204).json(result)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error deleting the command from the database",
    })
  }
})

module.exports = router
