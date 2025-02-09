/**
 * Dictionary server
 * 
 * POST: create && store the requested word; warning msg if already exist.
 * GET: retrieving definition of the requested word; 404 if not exist.
 * also: Total req# && total registered word#
 */

const http = require('http');
const { OK, NOT_OK } = require('./lang/en.js');

let reqNum = 0; // total request#
let dictionary = [];

const handleGet = (req, res) => {

    // CORS setting
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // request looks like: ?word=sth
    const urlParam = new URLSearchParams(req.url.split('?')[1]);
    const word = urlParam.get('word');

    const input = dictionary.find(item => item.word == word);

    if (input) {
        // input word found
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({
            message: OK.show_word,
            word: input.word,
            definition: input.definition,
            dictionarySize: dictionary.length,
            total_req: `${OK.total_req} ${reqNum}`
        }));
    } else {
        // input word not found
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(NOT_OK.word_not_found);
    }
}

const handlePost = (req, res) => {

    // CORS setting
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    let body = '';
    req.on('data', chunk => { // as long as data exist; chunk remain 
        body += chunk;
    });

    req.on('end', () => {
        const { word, definition } = JSON.parse(body);
        const is_exist = dictionary.find(item => item.word == word);

        if (is_exist) {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(NOT_OK.already_exist);
        } else {
            // create && store new word
            dictionary.push({ word, definition });
            reqNum++;

            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({
                message: `${OK.show_new_word}`,
                word: `${word}`,
                definition: `${definition}`,
                dictionarySize: dictionary.length
            }));
        }
    });
}

const handleOptions = (_req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(204); // No Content
    res.end();
};


const startServer = () => {
    const server = http.createServer((req, res) => {
        if (req.method == 'OPTIONS') { // to react preflight req
            handleOptions(req, res);
        } else if (req.method === 'GET' && req.url.includes('/api/definitions')) {
            handleGet(req, res);
        } else if (req.method === 'POST' && req.url.includes('/api/definitions')) {
            handlePost(req, res);
        } else {
            res.writeHead(404, { 'content-type': 'application/json' });
            res.end(NOT_OK.page_not_found);
        }
    });

    server.listen(80, () => {
        console.log("Server on 80:http");
    })
};

module.exports = { startServer };
