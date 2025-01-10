const db = require("../utils/db")

async function createClient(client) {
  try {
    const { name, age, email, phone_nb, address } = client
    const queryInsert =
      "INSERT INTO client (name, age, email, phone_nb, address) VALUES ('" +
      name +
      "', '" +
      age +
      "', '" +
      email +
      "', '" +
      phone_nb +
      "', '" +
      address +
      "')"
    await db.execute(queryInsert)

    const querySelect = "SELECT * FROM client WHERE id = " + insertedId
    const [rows] = await db.execute(querySelect)

    return rows[0]
  } catch (err) {
    console.error("Error while creating client :", err)
    throw err
  }
}

async function listClients() {
  try {
    const [rows] = await db.execute("SELECT * FROM client")
    return rows
  } catch (err) {
    console.error("Error while getting clients:", err)
    throw err
  }
}
async function getClientById(id) {
  try {
    const query = "SELECT * FROM client WHERE id = " + id
    console.log("Query executed:", query)
    const [rows] = await db.execute(query)
    return rows[0]
  } catch (err) {
    console.error("Error while getting client by id:", err)
    throw err
  }
}

async function updateClient(id, client) {
  const { name, age, email, phone_nb, address } = client
  try {
    const queryUpdate =
      "UPDATE client SET name = '" +
      name +
      "', age = '" +
      age +
      "', email = '" +
      email +
      "', phone_nb = '" +
      phone_nb +
      "', address = '" +
      address +
      "' WHERE id = " +
      id
    await db.execute(queryUpdate)

    const querySelect = "SELECT * FROM client WHERE id = " + id
    const [rows] = await db.execute(querySelect)
  } catch (err) {
    console.error("Error while updating client:", err)
    throw err
  }
}

async function deleteClient(id) {
  try {
    await db.execute("DELETE FROM client WHERE id = ?", [id])
  } catch (err) {
    console.error("Error while deleting client:", err)
    throw err
  }
}

async function listClientCommands(id) {
  try {
    const query =
      "SELECT c.*, cl.name AS client_name, cl.email AS client_email, " +
      "p.id AS product_id, p.name AS product_name, p.price AS product_price, p.quantity AS product_quantity " +
      "FROM command c " +
      "JOIN product_cmd pc ON c.id = pc.command_id " +
      "JOIN product p ON pc.product_id = p.id " +
      "JOIN client cl ON c.client_id = cl.id WHERE c.client_id = " +
      id
    const [rows] = await db.execute(query)

    const commandsWithProducts = rows.map((row) => ({
      ...row,
      products: rows.map((row) => ({
        product_id: row.product_id,
        product_name: row.product_name,
        product_price: row.product_price,
        product_quantity: row.product_quantity,
      })),
    }))

    return commandsWithProducts
  } catch (err) {
    console.error("rrror while getting client commands:", err)
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
}
