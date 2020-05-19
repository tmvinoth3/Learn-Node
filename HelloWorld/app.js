var logger = require("./logger");

logger.Log("message");

//Path Details

var path = require('path');

var pathObj = path.parse(__filename);

console.log(pathObj);

//OS Functions

var OSObj = require('os');

var FreeMemory = OSObj.freemem();

var TotalMemory = OSObj.totalmem();

console.log(`Total Memory ${TotalMemory/(1024*1024*1024)}`);
console.log(`Free Memory ${FreeMemory/(1024*1024*1024)}`);

//File System

var fsObj = require('fs');

var files = fsObj.readdirSync('./');
//console.log(files);

fsObj.readdir('./', function(err, files){
    if(err) console.log(err);
    else console.log(files);
});

