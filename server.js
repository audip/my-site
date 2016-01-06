var http = require("http");
var fs= require("fs");
var path = require("path");
var mime = require("mime");

function send404(response){
    response.writeHead(404, {"Content-type":"text/plain"});
    response.write("Oops 404 Error: Resource not found");
    response.end();
}

function sendPage(response, filePath, fileContents){
    response.writeHead(200, {"Content-type": mime.lookup(path.basename(filePath))});
    reponse.end(fileContents);
}


/*var express = require('express');
var app = express();

app.use(express.static(__dirname + "/dist"));

var port = process.env.PORT || 3000;
app.listen(port);
*/
