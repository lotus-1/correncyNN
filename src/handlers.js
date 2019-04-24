const path = require('path');
const fs = require('fs');
const request = require('request');
const url = require('url');
const querystring = require('querystring');

const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry, there is Error </h1>');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

const handlerPublic = (request, response, url) => {
  const extension = url.split(".")[1];
  const extenstionTypes = {
    html : 'text/html',
    js : 'application/javascript',
    css : 'text/css',
    ico : 'image/x-icon'
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(404, {'Content-Type' : 'text/html'});
      response.end('<h1> Sorry , I can not find the file </h1>');
    } else {
      response.writeHead(200, {'Content-Type' : extenstionTypes[extension]});
      response.end(file);
    }
  });
};
const handlerConvert = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const currency = parsedUrl.query;
  const value = querystring.parse(currency);
  const curs = ['AUD', 'USD', 'EUR', 'JPY', 'RUB', 'HUF', 'BGN', 'TRY', 'GBP'];
  if (curs.indexOf(value.cur) !== -1) {
  const myUrl = `https://api.exchangeratesapi.io/latest?base=${value.cur}`;
  request(myUrl, (err, response, body) => {
    const parsedBody = JSON.parse(body);
    if (err) {
      response.writeHead(404, {'Content-Type' : 'text/html'});
      response.end('Sorry, there is an error');
    } else {
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.end(`${parsedBody.rates.ILS}`);
    }
  })
}
};

module.exports = {
  handlerHome,
  handlerPublic,
  handlerConvert,
};
