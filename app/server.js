const express = require("express")
//const productRoutes = require("./routes/product")
const clientRoutes = require("./routes/client")

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(express.json())

//console log toutes les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
//app.use("/product", productRoutes)
app.use("/client", clientRoutes)

app.use((req, res) => {
  res.status(404).send("Not found")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
