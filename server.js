var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


var Storage = multer.diskStorage({
    destination: function(req, file, callback){
        console.log(file)
        callback(null, "./Images");
    },
    filename: function(req, file, callback){
        callback(null, file.fieldname + "_" + Date.now())
    }
})

var upload = multer({
    storage: Storage
}).array("imgUploader", 3)

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function(req,res){
    upload(req,res, function(err){
        if (err){
            console.log(err.message)
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.")
    })
})

app.listen(2000, function(a){
    console.log("Listening to port 2000")
})