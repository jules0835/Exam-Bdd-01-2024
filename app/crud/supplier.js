const db = require("../utils/db")
async function createSupplier(supplier) {
  const { name, address, email, phone_nb } = supplier
  try {
    const query =
      "INSERT INTO supplier (name, address, email, phone_nb) VALUES ('" +
      name +
      "', '" +
      address +
      "', '" +
      email +
      "', '" +
      phone_nb +
      "')"

    const [result] = await db.execute(query)
    const insertedId = result.insertId

    const selectQuery = "SELECT * FROM supplier WHERE id = " + insertedId
    const [rows] = await db.execute(selectQuery)
    return rows[0]
  } catch (err) {
    console.error("error while trying to creating the supplier:", err)
    throw err
  }
}

async function listSuppliers() {
  try {
    const [rows] = await db.execute("SELECT * FROM supplier")
    return rows
  } catch (err) {
    console.error("error while fetching suppliers:", err)
    throw err
  }
}

async function getSupplierById(id) {
  try {
    const [rows] = await db.execute("SELECT * FROM supplier WHERE id = ?", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while fetching supplier by iD:", err)
    throw err
  }
}

async function updateSupplier(id, supplier) {
  const { name, address, email, phone_nb } = supplier
  try {
    const updateQuery =
      "UPDATE supplier SET name = '" +
      name +
      "', address = '" +
      address +
      "', email = '" +
      email +
      "', phone_nb = '" +
      phone_nb +
      "' WHERE id = " +
      id

    await db.execute(updateQuery)

    const selectQuery = "SELECT * FROM supplier WHERE id = " + id
    const [rows] = await db.execute(selectQuery)
    return rows[0]
  } catch (err) {
    console.error("Error while updating supplier :", err)
    throw err
  }
}

async function deleteSupplier(id) {
  try {
    await db.execute("DELETE FROM supplier WHERE id = ?", [id])
  } catch (err) {
    console.error("error while delting supplier:", err)
    throw err
  }
}

async function getSupplierProducts(id) {
  try {
    const query =
      "SELECT p.* FROM product p JOIN supplier_product sp ON p.id = sp.product_id WHERE sp.supplier_id = " +
      id
    const [rows] = await db.execute(query)
    return rows
  } catch (err) {
    console.error("Error while fetching supplier's products:", err)
    throw err
  }
}

module.exports = {
  createSupplier,
  listSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getSupplierProducts,
}
