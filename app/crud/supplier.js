const db = require("../utils/db")

async function createSupplier(supplier) {
  const { name, address, email, phone_nb } = supplier
  try {
    if (!name || !address || !email || !phone_nb) {
      throw new Error("Invalid supplier data")
    }
    const [result] = await db.execute("CALL addSupplier(?, ?, ?, ?)", [
      name,
      address,
      email,
      phone_nb,
    ])

    const insertedId = result[0][0].insertedId

    const [rows] = await db.execute("CALL getSupplier(?)", [insertedId])
    return rows[0]
  } catch (err) {
    console.error("Error while trying to create the supplier:", err)
    throw err
  }
}

async function listSuppliers() {
  try {
    const [rows] = await db.execute("CALL getSuppliers()")
    return rows[0]
  } catch (err) {
    console.error("Error while fetching suppliers:", err)
    throw err
  }
}

async function getSupplierById(id) {
  try {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid supplier ID")
    }
    const [rows] = await db.execute("CALL getSupplier(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while fetching supplier by ID:", err)
    throw err
  }
}

async function updateSupplier(id, supplier) {
  const { name, address, email, phone_nb } = supplier
  try {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid supplier ID")
    }
    if (!name || !address || !email || !phone_nb) {
      throw new Error("Invalid supplier data")
    }
    await db.execute("CALL updateSupplier(?, ?, ?, ?, ?)", [
      id,
      name,
      address,
      email,
      phone_nb,
    ])

    const [rows] = await db.execute("CALL getSupplier(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while updating supplier:", err)
    throw err
  }
}

async function deleteSupplier(id) {
  try {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid supplier ID")
    }
    await db.execute("CALL deleteSupplier(?)", [id])
  } catch (err) {
    console.error("Error while deleting supplier:", err)
    throw err
  }
}

async function getSupplierProducts(id) {
  try {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid supplier ID")
    }
    const [rows] = await db.execute("CALL getSupplierProducts(?)", [id])
    return rows[0]
  } catch (err) {
    console.error("Error while fetching supplier's products:", err)
    throw err
  }
}

async function searchSupplier(q) {
  try {
    if (!q || typeof q !== "string") {
      throw new Error("Invalid search query")
    }
    const [rows] = await db.execute("CALL searchSupplier(?)", [q])
    return rows
  } catch (err) {
    console.error("Error while searching supplierr:", err)
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
  searchSupplier,
}
