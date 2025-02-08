/**
 * Dictionary server
 * 
 * POST: create && store the requested word; warning msg if already exist.
 * GET: retrieving definition of the requested word; 404 if not exist.
 * also: Total req# && total registered word#
 * 
 * ???
 * *: http or https ( but if you are sharing the https, make sure ssl is already installed and your web pages do not issues any security risk warning )
 * **: If it is a POST request, it adds a new record ( word: definition ) to our array of objects** ( array of word:definition).  
 * please pick dictionary as the identifier of the variable that holds the array of entries ( pick 'dictionary' as variable name for array of word:definition so that the marker can easily understand your code)
 * 
 * The service should return the response as JSON
 * 
 * Store the data in memory (note: we are talking about your server side memory, nodejs script), 
 * using array or any data structure you deem appropriate, therefore you do not need to set up a database at this stage for this assignment.
 */

const http = require('http');
const fs = require('fs'); // file system module
const path = require('path'); // file path module

const { OK, NOT_OK } = require('./lang/en.js');

let reqNum = 0; // total request#
let dictionary = [];

const handleGet = (req, res) => {

    // request looks like: ?word=sth
    const urlParam = new URLSearchParams(req.url.split('?')[1]);
    const word = urlParam.get('word');

    const input = dictionary.find(item => item.word == word); // === needed?

    if (input) {
        // input word found
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(
            OK.show_new_word,
            input.def, // how to show input word && definition of it
            dictionary.length,
            OK.total_req, reqNum
        );
    } else {
        // input word not found
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(NOT_OK.not_found_404); // json not need ${}?
    }
}

const handlePost = (req, res) => {

    let body = ''; // `` needed?
    req.on('data', chunck => {  // ???
        body += chunck;
    });

    req.on('end', () => { // end of data
        const { word, definition } = JSON.parse(body);
        const is_exist = dictionary.find(item => item.word == word); // === needed?

        if (is_exist) {
            res.writeHead();
            res.end();
        } else {
            // create && store new word
            dictionary.push({ word, definition });
            reqNum++;

            res.writeHead();
            res.end();
        }
    });
}

const startServer = () => {
    const server = http.createServer((req, res) => {



    });
};


// startServer();