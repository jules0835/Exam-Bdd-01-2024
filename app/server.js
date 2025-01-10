const express = require("express")
const clientRoutes = require("./routes/client")
const categoryRoutes = require("./routes/category")
const supplierRoutes = require("./routes/supplier")
const productRoutes = require("./routes/product")
const commandRoutes = require("./routes/command")

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
app.use("/api", clientRoutes)
app.use("/api", categoryRoutes)
app.use("/api", supplierRoutes)
app.use("/api", productRoutes)
app.use("/api", commandRoutes)

app.use((req, res) => {
  res.status(404).send("Not found")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
