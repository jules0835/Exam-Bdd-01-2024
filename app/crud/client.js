const db = require("../utils/db")

async function createClient(client) {
  try {
    const { name, age, email, phone_nb, address } = client
    console.log("address:", address)
    const [result] = await db.execute("CALL addClient(?, ?, ?, ?, ?)", [
      name,
      age,
      email,
      phone_nb,
      address,
    ])

    const insertedId = result[0][0].insertedId

    const [rows] = await db.execute("CALL getClient(?)", [insertedId])
    return rows[0]
  } catch (err) {
    console.error("Error while creating client :", err)
    throw err
  }
}

async function listClients() {
  try {
    const [rows] = await db.execute("CALL getAllClients()")
    return rows
  } catch (err) {
    console.error("Error while getting clients:", err)
    throw err
  }
}
async function getClientById(id) {
  try {
    const [rows] = await db.execute("CALL getClient(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while getting client by id:", err)
    throw err
  }
}

async function updateClient(id, client) {
  const { name, age, email, phone_nb, address } = client
  try {
    await db.execute("CALL updateClient(?, ?, ?, ?, ?, ?)", [
      id,
      name,
      age,
      email,
      phone_nb,
      address,
    ])

    const [rows] = await db.execute("CALL getClient(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while updating client:", err)
    throw err
  }
}

async function deleteClient(id) {
  try {
    await db.execute("CALL deleteClient(?)", [id])
  } catch (err) {
    console.error("Error while deleting client:", err)
    throw err
  }
}

async function listClientCommands(id) {
  try {
    const [rows] = await db.execute("CALL getClientCommands(?)", [id])

    const commands = []

    for (let row of rows[0]) {
      const command = commands.find((command) => command.id === row.command_id)
      console.log(command)
      if (command) {
        command.products.push({
          product_id: row.product_id,
          product_name: row.product_name,
          product_price: row.product_price,
          product_quantity: row.product_quantity,
        })
      } else {
        commands.push({
          id: row.command_id,
          client_id: row.client_id,
          total_price: row.total_price,
          expedition_date: row.expedition_date,
          delivery_date: row.delivery_date,
          products: [
            {
              product_id: row.product_id,
              product_name: row.product_name,
              product_price: row.product_price,
              product_quantity: row.product_quantity,
            },
          ],
        })
      }
    }
    return commands ? commands : null
  } catch (err) {
    console.error("Error while getting client commands:", err)
    throw err
  }
}

async function searchClients(q) {
  try {
    const [rows] = await db.execute("CALL searchClient(?)", [q])
    return rows
  } catch (err) {
    console.error("Error while searching clients:", err)
    throw err
  }
}

module.exports = {
  createClient,
  listClients,
  getClientById,
  updateClient,
  deleteClient,
  listClientCommands,
  searchClients,
}
