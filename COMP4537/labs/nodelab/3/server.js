const http = require('http'); // host as http
const { getDate } = require('./modules/utils.js');
const { greetingMSG, BAD_404, RWfile, getName, timeInfo } = require('./lang/en.js');
const fs = require('fs');
const path = require('path');

class Router {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.url = req.url;
        this.query = new URLSearchParams(this.url.split('?')[1]);

        this.fileName = this.url.split('/').pop();
        this.filePath = path.join(__dirname, this.fileName);
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
        const name = this.query.get('name') || 'Guest';
        const dateTime = getDate();
        const resMSG = `${greetingMSG.replace('%1', name)} ${timeInfo} ${dateTime}`;

        this.res.writeHead(200, { 'Content-type': 'text/html' });
        this.res.write(`<p>${getName}</p>`);
        this.res.end(`<p style="color: blue;">${resMSG}</p>`);
    }

    handleReadFile() {
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                this.res.writeHead(404, { 'Content-type': 'text/html' });
                this.res.end(`<h1>${RWfile.no_access}</h1> <h2>${this.fileName}</h2>`);
                return;
            }

            this.res.writeHead(200, { 'Content-type': 'text/html' });
            this.res.end(`<pre>${data}</pre>`);
        });
    }

    handleWriteFile() {
        const text = this.query.get('text');

        if (!text) {
            this.res.writeHead(400, { 'Content-type': 'text/html' });
            this.res.end(`<h1>${RWfile.no_access}</h1>`);
            return;
        }

        fs.appendFile(this.filePath, text + '\n', (err) => {
            if (err) {
                this.res.writeHead(500, { 'Content-type': 'text/html' });
                this.res.end(`<h1>${RWfile.no_access}</h1>`);
                return;
            }

            this.res.writeHead(200, { 'Content-type': 'text/html' });
            this.res.end(`<h1>${RWfile.ok}</h1> <p>${text}</p>`);
        });
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
        console.log("Ok: server.js");
    });
};

module.exports = { startServer };
