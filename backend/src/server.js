//const express = require("express")
// import mongoose from "mongoose"

import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config(); 
const app = express();

const __dirname = path.resolve()
console.log(__dirname)

app.use(express.json())

if(process.env.NODE_ENV !== "production") {
  app.use(cors(
    // {origin : 'http://localhost:5173' ,}
  ))
}
app.use("/api/notes", notesRoutes);

console.log(process.env.NODE_ENV)
//middleware
// app.use(express.urlencoded({extended: true}))
// app.use(rateLimiter)

if(process.env.NODE_ENV === "production") {
  
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..frontend", "dist", "index.html"))
  })
}


app.use((req, res, next) => {
  console.log(`Request received. Method is ${req.method} and URL is ${req.url}`)
  next()
})


const PORT=process.env.PORT || 5001


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
})

