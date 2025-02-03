const https = require('http');
const url = require('url');
const { getDate } = require('./modules/utils');
const { greetingMSG } = require('./lang/en.js');

const server = https.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    // get name
    const name = queryObject.name || 'Guest';

    // get server time
    const dateTime = getDate();
    const resMSG = `${greetingMSG.replace('%1', name)} Server current date and time is ${dateTime}`;

    // res header
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(`<p>Write your name after the URL such as: url/?name=thename</p>`);
    res.end(`<p style="color: blue;">${resMSG}</p>`);
});

server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080 at the moment.");
});
