const db = require("../utils/db")

async function createCommand(command) {
  const {
    client_id,
    total_price,
    product_nb,
    expedition_date,
    delivery_date,
    products,
  } = command

  try {
    const queryInsertCommand =
      "INSERT INTO command (client_id, total_price, product_nb, expedition_date, delivery_date, command_date) " +
      "VALUES (" +
      client_id +
      ", " +
      total_price +
      ", " +
      product_nb +
      ", '" +
      expedition_date +
      "', '" +
      delivery_date +
      "', NOW())"
    const [result] = await db.execute(queryInsertCommand)
    const insertedId = result.insertId

    if (products && products.length > 0) {
      for (let product of products) {
        const queryInsertProductCmd =
          "INSERT INTO product_cmd (product_id, command_id) VALUES (" +
          product.product_id +
          ", " +
          insertedId +
          ")"
        await db.execute(queryInsertProductCmd)
      }
    }

    const queryGetCommand =
      "SELECT c.*, cl.name AS client_name, cl.email AS client_email, " +
      "p.id AS product_id, p.name AS product_name, p.price AS product_price, p.quantity AS product_quantity " +
      "FROM command c " +
      "JOIN product_cmd pc ON c.id = pc.command_id " +
      "JOIN product p ON pc.product_id = p.id " +
      "JOIN client cl ON c.client_id = cl.id WHERE c.id = " +
      insertedId
    const [rows] = await db.execute(queryGetCommand)

    const commandWithProducts = {
      ...rows[0],
      products: rows.map((row) => ({
        product_id: row.product_id,
        product_name: row.product_name,
        product_price: row.product_price,
        product_quantity: row.product_quantity,
      })),
    }
    return commandWithProducts
  } catch (err) {
    console.error("Error while creating the command:", err)
    throw err
  }
}

async function listCommands() {
  try {
    const [rows] = await db.execute(
      "SELECT c.*, cl.name AS client_name, cl.email AS client_email, " +
        "p.id AS product_id, p.name AS product_name, p.price AS product_price, p.quantity AS product_quantity " +
        "FROM command c " +
        "JOIN product_cmd pc ON c.id = pc.command_id " +
        "JOIN product p ON pc.product_id = p.id " +
        "JOIN client cl ON c.client_id = cl.id"
    )

    const commands = []
    rows.forEach((row) => {
      let command = commands.find((cmd) => cmd.id === row.id)
      if (!command) {
        command = {
          id: row.id,
          client_id: row.client_id,
          total_price: row.total_price,
          command_date: row.command_date,
          expedition_date: row.expedition_date,
          delivery_date: row.delivery_date,
          client_name: row.client_name,
          client_email: row.client_email,
          products: [],
        }
        commands.push(command)
      }
      command.products.push({
        product_id: row.product_id,
        product_name: row.product_name,
        product_price: row.product_price,
        product_quantity: row.product_quantity,
      })
    })

    return commands
  } catch (err) {
    console.error("Error while fetching commands:", err)
    throw err
  }
}

async function getCommandById(id) {
  try {
    const query =
      "SELECT c.*, cl.name AS client_name, cl.email AS client_email, " +
      "p.id AS product_id, p.name AS product_name, p.price AS product_price, p.quantity AS product_quantity " +
      "FROM command c " +
      "JOIN product_cmd pc ON c.id = pc.command_id " +
      "JOIN product p ON pc.product_id = p.id " +
      "JOIN client cl ON c.client_id = cl.id WHERE c.id = " +
      id

    const [rows] = await db.execute(query)

    const commandWithProducts = {
      ...rows[0],
      products: rows.map((row) => ({
        product_id: row.product_id,
        product_name: row.product_name,
        product_price: row.product_price,
        product_quantity: row.product_quantity,
      })),
    }

    return commandWithProducts
  } catch (err) {
    console.error("Error while fetching command by ID:", err)
    throw err
  }
}

async function updateCommand(id, command) {
  const {
    client_id,
    total_price,
    product_nb,
    expedition_date,
    delivery_date,
    products,
  } = command

  try {
    const queryUpdateCommand =
      "UPDATE command SET client_id = " +
      client_id +
      ", total_price = " +
      total_price +
      ", product_nb = " +
      product_nb +
      ", expedition_date = '" +
      expedition_date +
      "', delivery_date = '" +
      delivery_date +
      "' WHERE id = " +
      id
    await db.execute(queryUpdateCommand)

    if (products && products.length > 0) {
      const queryDeleteProductCmd =
        "DELETE FROM product_cmd WHERE command_id = " + id
      await db.execute(queryDeleteProductCmd)
      for (let product of products) {
        const queryInsertProductCmd =
          "INSERT INTO product_cmd (product_id, command_id) VALUES (" +
          product.product_id +
          ", " +
          id +
          ")"
        await db.execute(queryInsertProductCmd)
      }
    }

    const queryGetCommand =
      "SELECT c.*, cl.name AS client_name, cl.email AS client_email, " +
      "p.id AS product_id, p.name AS product_name, p.price AS product_price, p.quantity AS product_quantity " +
      "FROM command c " +
      "JOIN product_cmd pc ON c.id = pc.command_id " +
      "JOIN product p ON pc.product_id = p.id " +
      "JOIN client cl ON c.client_id = cl.id WHERE c.id = " +
      id
    const [rows] = await db.execute(queryGetCommand)

    const commandWithProducts = {
      ...rows[0],
      products: rows.map((row) => ({
        product_id: row.product_id,
        product_name: row.product_name,
        product_price: row.product_price,
        product_quantity: row.product_quantity,
      })),
    }
    return commandWithProducts
  } catch (err) {
    console.error("Error while updating command:", err)
    throw err
  }
}

async function deleteCommand(id) {
  try {
    await db.execute("DELETE FROM product_cmd WHERE command_id = ?", [id])

    await db.execute("DELETE FROM command WHERE id = ?", [id])
  } catch (err) {
    console.error("error while deletin command:", err)
    throw err
  }
}

module.exports = {
  createCommand,
  listCommands,
  getCommandById,
  updateCommand,
  deleteCommand,
}
