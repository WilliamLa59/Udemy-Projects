const { response } = require('express');
const express = require('express');
const app = express();

app.get("/", function(req, res){
    res.send("<h1>Hello, World!</h1>")
});

app.get("/contact", function(req, res){
    res.send("Contact me at: william.la59@gmail.com")
});

app.listen(3000, function () {
    console.log("server started on port 3000");
});
