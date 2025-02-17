import express from "express"
import cors from "cors"
import generateRouter from "../api/generate"

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['your-production-domain.com'] 
    : ['http://localhost:5173']
}))