const EventEmitter = require('events');

var Logger = require('./logger');
var logger = new Logger();

//Register event listener
logger.on('loggerRaised', (eventArgs) => {
    console.log('event raised', eventArgs);
});

logger.Log('message');