var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

function send404(response) {
    //response.writeHead(404, {"Content-type" : mime.lookup(path.basename(filePath))});
    response.write("Error 404: resource not found");
    response.end();
}

function sendPage(response, filePath, fileContents) {
    response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

function serverWorking(request, response, absPath) {
    fs.exists(absPath, function(exists) {
        if (exists) {
            fs.readFile(absPath, function(err, data) {
                if (err) {
                    send404(response);
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
    serverWorking(request, response, absPath);
});

    function email_sender(req) {

        console.log("I am here");

        var nodemailer = require('nodemailer');
        var express = require('express');
        var app = express();
        var router = express.Router();
        var bodyParser = require('body-parser');

        app.use(express.static(path.join(__dirname, 'app')));
        app.use(bodyParser.text({ type: 'text/html' }));

        //console.log(req.body.username);

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://aditya.p1993@hotmail.com:GoogleEarth1993@smtp.hotmail.com');

        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
            to: 'Aditya Purandare <hello@adityapurandare.ml>', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ✔', // plaintext body
            html: '<b>Hello world ✔</b>' // html body
        };

        app.post('/mail', function(req, res){
            console.log("Hello");
        });

        // send mail with defined transport object
        /*transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);

        });
        */
    }

var port_number = server.listen(process.env.PORT || 3000);
