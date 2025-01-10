const db = require("../utils/db")

async function createProduct(product) {
  const { name, price, quantity, category_id, supplier_id } = product
  try {
    const queryInsertProduct =
      "INSERT INTO product (name, price, quantity, category_id) VALUES (" +
      name +
      ", " +
      price +
      ", " +
      quantity +
      ", " +
      category_id +
      ");"
    await db.execute(queryInsertProduct)

    const [result] = await db.execute(queryInsertProduct)
    const insertedId = result.insertId

    if (supplier_id) {
      const queryInsertSupplierProduct =
        "INSERT INTO supplier_product (product_id, supplier_id) VALUES (" +
        insertedId +
        ", " +
        supplier_id +
        ")"
      await db.execute(queryInsertSupplierProduct)
    }

    const queryGetProduct =
      "SELECT p.*, sp.supplier_id FROM product p LEFT JOIN supplier_product sp ON p.id = sp.product_id WHERE p.id = " +
      insertedId
    const [rows] = await db.execute(queryGetProduct)

    return rows[0]
  } catch (err) {
    console.error("Error while creating the new the product:", err)
    throw err
  }
}

async function listProducts() {
  try {
    const [rows] = await db.execute(
      "SELECT p.*, sp.supplier_id FROM product p LEFT JOIN supplier_product sp ON p.id = sp.product_id"
    )
    return rows
  } catch (err) {
    console.error("Error while fetching products:", err)
    throw err
  }
}

async function getProductById(id) {
  try {
    console.log("id", id)
    const query =
      "SELECT p.*, sp.supplier_id FROM product p LEFT JOIN supplier_product sp ON p.id = sp.product_id WHERE p.id = " +
      id
    const [rows] = await db.execute(query)

    return rows[0]
  } catch (err) {
    console.error("Error while fetching product by Id:", err)
    throw err
  }
}

async function updateProduct(id, product) {
  const { name, price, quantity, category_id, supplier_id } = product
  try {
    await db.execute(
      "UPDATE product SET name = '" +
        name +
        "', price = " +
        price +
        ", quantity = " +
        quantity +
        ", category_id = " +
        category_id +
        " WHERE id = " +
        id
    )

    if (supplier_id) {
      await db.execute(
        "INSERT INTO supplier_product (product_id, supplier_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE supplier_id = ?",
        [id, supplier_id, supplier_id]
      )
    }

    const [rows] = await db.execute(
      "SELECT p.*, sp.supplier_id FROM product p LEFT JOIN supplier_product sp ON p.id = sp.product_id WHERE p.id = ?",
      [id]
    )

    return rows[0]
  } catch (err) {
    console.error("Error while updating product:", err)
    throw err
  }
}

async function deleteProduct(id) {
  try {
    await db.execute("DELETE FROM supplier_product WHERE product_id = ?", [id])

    await db.execute("DELETE FROM product WHERE id = ?", [id])
  } catch (err) {
    console.error("Error while deleting product:", err)
    throw err
  }
}

module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
