const mysql = require("mysql2/promise")
const dotenv = require("dotenv")

dotenv.config()

let pool

function initDatabasePool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
    console.log("Pool de connexions à la base de données initialisé")
  }
  return pool
}

module.exports = initDatabasePool()
