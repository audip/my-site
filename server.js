var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

function send404(response, filePath) {
    response.writeHead(404, {"Content-type" : mime.lookup(path.basename(filePath))});
    //response.write("Error 404: resource not found");
    response.end();
}

function sendPage(response, filePath, fileContents) {
    response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

function serverWorking(response, absPath) {
    fs.exists(absPath, function(exists) {
        if (exists) {
            fs.readFile(absPath, function(err, data) {
                if (err) {
                    absPath="./app/404.html";
                    send404(response, absPath);
                } else {
                    sendPage(response, absPath, data);
                }
            });
        } else {
            send404(response);
        }
    });
}

var server = http.createServer(function(request, response) {
    var filePath = false;

    if (request.url == "/") {
        filePath = "app/index.html";
    } else {
        filePath = "app" + request.url;
    }

    var absPath = "./" + filePath;
    serverWorking(response, absPath);
});

var port_number = server.listen(process.env.PORT || 3000);
