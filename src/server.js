const http = require('http');
const router = require('./router');

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

http.createServer(router).listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`)
});
