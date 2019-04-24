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
// i think we should check if the value.cur is one of our options then continue with the function cuz if not we should write an error msg
const handlerConvert = (req, res) => {
  // console.log(req.url);
  const parsedUrl = url.parse(req.url);
  // console.log('My parsedUrl is : ', parsedUrl);
  const currency = parsedUrl.query;
  const value = querystring.parse(currency);
  console.log(value);
  //const 
  const myUrl = `https://api.exchangeratesapi.io/latest?base=${value.cur}`;
  request(myUrl, (err, response, body) => {
    const parsedBody = JSON.parse(body);
    console.log('This is the ILS : ', parsedBody.rates.ILS);
    if (err) {

      response.writeHead(404, {'Content-Type' : 'text/html'});
      response.end('Sorry, there is a server error');
    } else {
      console.log(parsedBody.rates.ILS);
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.end(`${parsedBody.rates.ILS}`);
    }
  });
};

module.exports = {
  handlerHome,
  handlerPublic,
  handlerConvert,
};
