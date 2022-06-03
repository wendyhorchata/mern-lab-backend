// DEPENDENCIES

require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL)
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))


// MODELS
////////////////////////////////
const FoodSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: String,
  })

  const Food = mongoose.model("Food", FoodSchema)


// MiddleWare
////////////////////////////////
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan("dev")) // logging
app.use(express.json()) 



// ROUTES

// create a test route
app.get("/", (req, res) => {
  res.send("hello world")
})



// FOOD INDEX ROUTE
app.get("/food", async (req, res) => {
    try {
      res.json(await Food.find({}))
    } catch (error) {
      res.status(400).json(error)
    }
  })

// FOOD CREATE ROUTE
app.post("/food", async (req, res) => {
    try {
      res.json(await People.create(req.body))
    } catch (error) {
      res.status(400).json(error)
    }
  })

// FOOD DELETE ROUTE
app.delete("/food/:id", async (req, res) => {
    try {
      res.json(await Food.findByIdAndDelete(req.params.id))
    } catch (error) {
      res.status(400).json(error)
    }
  })
  
  // FOOD UPDATE ROUTE
  app.put("/food/:id", async (req, res) => {
    try {
      res.json(
        await Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
      )
    } catch (error) {
      res.status(400).json(error)
    }
  })



// LISTENER

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))