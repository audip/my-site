var server = http.createServer(function(request, response){
    var filePath = false;

    if(request.url == '/')
    {
        filePath = "app/index.html"
    }
});
