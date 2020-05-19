const EventEmitter = require('events');

class Logger extends EventEmitter{
    Log(message) {
        console.log(message);
        this.emit('loggerRaised', {id:1, url:'https://google.com'});
    }
}

//module.exports.Logger = Logger;

module.exports = Logger;