// let http = require('http');
// http.createServer(function (request, response) {
//     response.writeHead(200, { 'Content-type': 'text/plain' });
//     response.write("Response's coming from server...\n");
//     response.end();
// }).listen(8080);

const math = require('./math.js');
console.log(`Hello Saeyoung. Typically, 1 + 1 is ${math.add(1, 1)}`);
console.log(`Hello Saeyoung. Typically, 1 - 1 is ${math.subtract(1, 1)}`);
