var server = http.createServer(function(request, response){
    var filePath = false;

    if(request.url == '/') {
        filePath = "app/index.html";
    } else {
        filePath = "app" + request.url;
    }

    var absPath = "./" + filePath;
    serverWorking(response, absPath);
});

server.listen(process.env.PORT || 8888);
