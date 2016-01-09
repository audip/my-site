var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var eMail = require("./email.js");

var app = express();
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({ extended: true }));

function send404(response) {
    //response.writeHead(404, {"Content-type" : mime.lookup(path.basename(filePath))});
    response.write("Error 404: resource not found");
    response.end();
}

function sendPage(response, filePath, fileContents) {
    response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

app.get('/', function(req, res) {
    var filePath = false;

    if (req.url == "/") {
        filePath = "app/index.html";
    } else {
        filePath = "app" + req.url;
    }

    var absPath = "./" + filePath;

    fs.readFile(absPath, function(err, data) {
        if (err) {
            send404(res);
        } else {
            sendPage(res, absPath, data);
        }
    });
});

app.post('/', function(req, res){

    var username = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var msg = req.body.msgtext;
    eMail(username, email, phone, msg);
});

app.listen(process.env.PORT || 3000);
