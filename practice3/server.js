const express = require('express')
const cors = require('cors')

const app = express();

// var corOptions = {
//     origin: 'https://localhost:5000'
// }

// // middleware
// app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//router
const router = require('./routes/books.js')

app.use('/api/books', router)



//testing api
app.get('/', (req,res) =>{
    res.json('books.json')
})

//port
const PORT = process.env.PORT || 5000

//server 
app.listen(PORT, () => console.log(`server is running port ${PORT}`))

