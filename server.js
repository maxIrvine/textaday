console.log("test")
const http = require("http");
const hostname = 'localhost';
const port = 3000;

http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080