const db = require("../utils/db")

async function createClient(client) {
  const { name, email } = client
  try {
    const [result] = await db.execute(
      "INSERT INTO clients (name, email) VALUES (?, ?)",
      [name, email]
    )
    const insertedId = result.insertId

    // Récupérer le client inséré (facultatif)
    const [rows] = await db.execute("SELECT * FROM clients WHERE id = ?", [
      insertedId,
    ])
    return rows[0]
  } catch (err) {
    console.error("Erreur lors de la création du client :", err)
    throw err
  }
}

async function listClients() {
  try {
    const [rows] = await db.execute("SELECT * FROM client")
    return rows
  } catch (err) {
    console.error("Erreur lors de la récupération des clients :", err)
    throw err
  }
}

module.exports = {
  createClient,
  listClients,
}
