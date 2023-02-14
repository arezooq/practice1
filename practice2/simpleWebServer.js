const http = require('http')
const moment = require('moment')
const { format } = require('date-fns')
const EventEmitter = require('events')

const emitter = new EventEmitter()
const PORT = process.env.PORT || 3000


const server = http.createServer(async (req, res) =>{
    // Simple web server
    if(req.url === '/'){
        res.write('<h1>Hello, Word!</h1>')
        res.end()
    }

    // current time with moment and date-fns
    if(req.url === '/api/current-time'){
        const dateTime = await getCurrentTime()
        res.write(dateTime)
        res.end()
    }

    // web server with emitter
    if(req.url === '/api/person'){
        res.writeHead(200, {'Content-Type': 'application/json'})
        setTimeout(() =>{
            emitter.emit('personReady', {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "age": 18
    })
        },2000)
        emitter.on('personReady', (person) =>{
            res.end(JSON.stringify({person}))
        })
    }
})

async function getCurrentTime() {
    // return moment().format('YYYY-MM-DD hh:mm:ss')
    return `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`
}

server.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))