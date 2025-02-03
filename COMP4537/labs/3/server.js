const http = require('http'); // host as http
const { getDate } = require('./modules/utils');
const { greetingMSG } = require('./lang/en.js');

const startServer = () => {

    const server = http.createServer((req, res) => {
        const url = req.url;

        // check ?query
        const queryObject = new URLSearchParams(url.split('?')[1]);
        const name = queryObject.get('name') || 'Guest';

        // get server time
        const dateTime = getDate();
        const resMSG = `${greetingMSG.replace('%1', name)} Server current date and time is ${dateTime}`;

        // res header
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write(`<p>Write your name after the URL such as: url/?name=thename</p>`);
        res.end(`<p style="color: blue;">${resMSG}</p>`);
    });

    server.listen(8080, () => {
        console.log("Server is running...");
    });
};

module.exports = { startServer };
