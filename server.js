var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

var app = express();

app.use(bodyParser.text({ type: 'text/html' }));

function send404(response) {
    //response.writeHead(404, {"Content-type" : mime.lookup(path.basename(filePath))});
    response.write("Error 404: resource not found");
    response.end();
}

function sendPage(response, filePath, fileContents) {
    response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

app.use(express.static('./app'));
app.use(bodyParser.text({ type: 'text/html' }));

app.get('/', function(req, res){
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

    console.log("I am here");

    var nodemailer = require('nodemailer');
    var bodyParser = require('body-parser');

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

    // send mail with defined transport object
    /*transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });*/
});

app.listen(process.env.PORT || 3000);
