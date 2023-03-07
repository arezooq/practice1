import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import router from './routes/route'
import axios from 'axios'
import fs from 'fs'
import cors from 'cors'



var corOptions = {
    origin: 'https://localhost:3000'
}


dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
const DB_URI = process.env.DB_URI ||  "localhost:27017/Football_Table"

mongoose.connect(DB_URI)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to the database!'))

// middlewares

app.use(cors(corOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static("logos"))
app.use(express.static("uploads"))

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}))


// set template engine

app.set('view engine', 'ejs')

// route prefix

app.use("", router)




app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})

