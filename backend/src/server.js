//const express = require("express")
// import mongoose from "mongoose"

import express from "express"
import cors from 'cors'
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config(); 
const app = express();

//middleware
app.use(cors(
  // {origin : 'http://localhost:5173' ,}
))
app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(rateLimiter)

app.use((req, res, next) => {
  console.log(`Request received. Method is ${req.method} and URL is ${req.url}`)
  next()
})


const PORT=process.env.PORT || 5001

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
})

