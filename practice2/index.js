const events = require('events')
const EventEmitter = new events.EventEmitter()

const myEventHandler = function(){
    console.log('I sense a scream')
}

EventEmitter.on('scream', myEventHandler)
EventEmitter.emit('scream')