var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var nodemailer = require('nodemailer');

var app = express();

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
app.use(bodyParser.urlencoded({ extended: true }));

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

    //console.log("I am here");
    var username = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var msg = req.body.msgtext;
    //console.log(username+" "+email+" "+phone+" "+msg);

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://aditya.p1993%40hotmail.com:GoogleEarth1993@smtp-mail.outlook.com');

    var fromUser = username+' <'+email+'>';
    var toUser = 'Aditya Purandare <hello@adityapurandare.ml>';
    var sub = 'Hello to you - Aditya';
    var bodyText = msg + " Phone: " + phone;
    console.log(fromUser + " " + toUser + " " + sub + " " + bodyText);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: fromUser, // sender address
        to: toUser, // list of receivers
        subject: sub, // Subject line
        text: bodyText, // plaintext body
        html: '<p> ' + bodyText + ' </p>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});

app.listen(process.env.PORT || 3000);
