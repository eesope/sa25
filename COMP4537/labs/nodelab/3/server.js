const http = require('http'); // host as http
const { getDate } = require('./modules/utils.js');
const { greetingMSG, BAD_404 } = require('./lang/en.js');

class Router {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.url = req.url;
    }

    // routing upon url
    route() {
        switch (true) {
            case this.url.includes('COMP4537/labs/3/getDate'):
                this.handleGetDate();
                break;
            case this.url.includes('COMP4537/labs/3/readFile'):
                this.handleReadFile();
                break;
            case this.url.includes('COMP4537/labs/3/writeFile'):
                this.handleWriteFile();
                break;
            default:
                this.handle404();
                break;
        }
    }

    handleGetDate() {
        const queryObject = new URLSearchParams(this.url.split('?')[1]);
        const name = queryObject.get('name') || 'Guest';
        const dateTime = getDate();
        const resMSG = `${greetingMSG.replace('%1', name)} Server current date and time is ${dateTime}`;

        this.res.writeHead(200, { 'Content-type': 'text/html' });
        this.res.write(`<p>Write your name after the URL such as: url/?name=thename</p>`);
        this.res.end(`<p style="color: blue;">${resMSG}</p>`);
    }

    handleReadFile() {
        this.res.writeHead(200, { 'Content-type': 'text/html' });
        this.res.end(`<p>File read functionality is not yet implemented.</p>`);
    }

    handleWriteFile() {
        this.res.writeHead(200, { 'Content-type': 'text/html' });
        this.res.end(`<p>File write functionality is not yet implemented.</p>`);
    }

    handle404() {
        this.res.writeHead(404, { 'Content-type': 'text/html' });
        this.res.end(`<h1>${BAD_404}</h1>`);
    }
}

const startServer = () => {

    const server = http.createServer((req, res) => {
        const router = new Router(req, res);
        router.route();
    });

    server.listen(8080, () => {
        console.log("Server is running...");
    });
};

module.exports = { startServer };
