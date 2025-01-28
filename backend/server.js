const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express()
const port = 5000

app.use(cors())

// Read the JSON data
const rawData = fs.readFileSync(path.join(__dirname, "data.json"))
const financialData = JSON.parse(rawData)

app.get("/api/portfolio-data", (req, res) => {
  res.json(financialData)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

