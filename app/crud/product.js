const db = require("../utils/db")

async function createProduct(product) {
  const { name, price, category_id, supplier_id, quantity, description } =
    product
  try {
    if (!name || !price || !category_id || !quantity || !description) {
      throw new Error("Invalid product data")
    }
    if (typeof price !== "number" || typeof category_id !== "number") {
      throw new Error("Invalid product data")
    }

    const [result] = await db.execute("CALL addProduct(?, ?, ?, ?, ?)", [
      name,
      price,
      category_id,
      description,
      quantity,
    ])

    const insertedId = result[0][0].insertedId

    if (supplier_id) {
      await db.execute("CALL addSupplierProduct(?, ?)", [
        supplier_id,
        insertedId,
      ])
    }

    const [rows] = await db.execute("CALL getProduct(?)", [insertedId])

    return rows[0]
  } catch (err) {
    console.error("Error while creating the new product:", err)
    throw err
  }
}

async function listProducts() {
  try {
    const [rows] = await db.execute("CALL getProducts()")
    return rows[0]
  } catch (err) {
    console.error("Error while fetching products:", err)
    throw err
  }
}

async function getProductById(id) {
  try {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid product ID")
    }

    const [rows] = await db.execute("CALL getProduct(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while fetching product by Id:", err)
    throw err
  }
}

async function updateProduct(id, product) {
  const { name, price, quantity, category_id, supplier_id, description } =
    product
  try {
    if (!name || !price || !quantity || !category_id || !description) {
      throw new Error("Invalid product data")
    }
    if (typeof price !== "number" || typeof category_id !== "number") {
      throw new Error("Invalid products data")
    }
    await db.execute("CALL updateProduct(?, ?, ?, ?, ?,?)", [
      id,
      name,
      price,
      category_id,
      description,
      quantity,
    ])

    if (supplier_id) {
      await db.execute("CALL updateSupplierProduct(?, ?)", [supplier_id, id])
    }

    const [rows] = await db.execute("CALL getProduct(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while updating product:", err)
    throw err
  }
}

async function deleteProduct(id) {
  try {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid product  ID")
    }

    // Il n'est pas possible de supprimer un produit qui a été commandé
    await db.execute("CALL deleteSupplierProduct(?)", [id])
    await db.execute("CALL deleteProduct(?)", [id])
  } catch (err) {
    console.error("Error while deleting product:", err)
    throw err
  }
}

async function listCommandsByProductId(id) {
  try {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid product ID")
    }

    const [rows] = await db.execute("CALL getCommandsByProduct(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while fetching commands by product id:", err)
    throw err
  }
}

async function getLowStockProducts(seuil) {
  try {
    if (!seuil || typeof seuil !== "number") {
      throw new Error("Invalid or missing 'seuil'")
    }
    const [rows] = await db.execute("CALL getLowStock(?)", [seuil])
    return rows[0]
  } catch (err) {
    console.error("Error while fetching low stock products:", err)
    throw err
  }
}

async function searchProduct(q) {
  try {
    if (!q || typeof q !== "string") {
      throw new Error("Invalid or missing 'q'")
    }
    const [rows] = await db.execute("CALL searchProduct(?)", [q])
    return rows[0]
  } catch (err) {
    console.error("Error while fetching products by name and category:", err)
    throw err
  }
}

module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  listCommandsByProductId,
  getLowStockProducts,
  searchProduct,
}
