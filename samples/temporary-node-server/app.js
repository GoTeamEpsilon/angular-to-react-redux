var express = require("express");
var path = require("path");
var http = require("http");
var logger = require("morgan");

var app = express();

var publicPath = path.resolve(__dirname, 'json');
app.use(express.static(publicPath));


app.get("/", function (request, response) {
    response.end("Empty Express Server");

});


app.use(function (request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});


http.createServer(app).listen(3001);