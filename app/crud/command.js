const db = require("../utils/db")

async function createCommand(command) {
  const { client_id, products } = command

  try {
    for (let product of products) {
      const { product_id, quantity } = product

      try {
        await db.execute("CALL checkAndUpdateStock(?, ?)", [
          product_id,
          quantity,
        ])
      } catch (err) {
        return { error: err.message }
      }
    }

    const [result] = await db.execute("CALL addCommand(?)", [client_id])

    const commadnId = result[0][0].insertedId

    for (let product of products) {
      const { product_id, quantity } = product

      await db.execute("CALL addProduct_command(?, ?, ?)", [
        product_id,
        commadnId,
        quantity,
      ])
    }

    const [rows] = await db.execute("CALL getCommand(?)", [commadnId])

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
    console.log(commands)
    return commands
  } catch (err) {
    console.error("Error while creating the command:", err)
    throw err
  }
}

async function listCommands() {
  try {
    const [rows] = await db.execute("CALL getCommands()")

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
    console.log(commands)
    return commands
  } catch (err) {
    console.error("Error while fetching commands:", err)
    throw err
  }
}

async function getCommandById(id) {
  try {
    const [rows] = await db.execute("CALL getCommand(?)", [id])

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
    return commands ? commands[0] : null
  } catch (err) {
    console.error("Error while fetching command by ID:", err)
    throw err
  }
}

async function updateCommand(id, command) {
  const {
    client_id,
    total_price,
    command_date,
    expedition_date,
    delivery_date,
    products,
  } = command

  try {
    await db.execute("CALL updateCommand(?, ?, ?, ?, ?, ?)", [
      id,
      client_id,
      total_price,
      command_date,
      expedition_date,
      delivery_date,
    ])

    for (let product of products) {
      const { product_id, quantity } = product

      try {
        await db.execute("CALL checkAndUpdateStock(?, ?)", [
          product_id,
          quantity,
        ])
      } catch (err) {
        return { error: err.message }
      }
    }

    await db.execute("CALL deleteProducts_command(?)", [id])

    for (let product of products) {
      const { product_id, quantity } = product

      await db.execute("CALL addProduct_command(?, ?, ?)", [
        product_id,
        id,
        quantity,
      ])
    }

    const [rows] = await db.execute("CALL getCommand(?)", [id])

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
    return commands ? commands[0] : null
  } catch (err) {
    console.error("Error while updating the command:", err)
    throw err
  }
}

async function deleteCommand(id) {
  try {
    await db.execute("CALL deleteCommand(?)", [id])
  } catch (err) {
    console.error("Error while deleting command:", err)
    throw err
  }
}

async function filterCommandsByDates(start, end) {
  try {
    start = new Date(start).toISOString().slice(0, 19).replace("T", " ")
    end = new Date(end).toISOString().slice(0, 19).replace("T", " ")
    const [rows] = await db.execute("CALL getCommandsByDate(?, ?)", [
      start,
      end,
    ])
    return rows
  } catch (err) {
    console.error("Error while filtering commands by dates:", err)
    throw err
  }
}

async function getStats() {
  try {
    const [productsSoldRows] = await db.execute("CALL getStatsProductsSold()")
    const productsSold = productsSoldRows[0][0].products_sold

    const [totalSalesRows] = await db.execute("CALL getStatsTotalSales()")
    const totalSales = totalSalesRows[0][0].total_sales

    return {
      productsSold,
      totalSales,
    }
  } catch (err) {
    console.error("Error while getting stats:", err)
    throw err
  }
}

module.exports = {
  createCommand,
  listCommands,
  getCommandById,
  updateCommand,
  deleteCommand,
  filterCommandsByDates,
  getStats,
}
