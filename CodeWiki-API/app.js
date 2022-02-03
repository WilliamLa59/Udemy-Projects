//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const mongoURI = "mongodb+srv://william:Password@cluster0.8drqb.mongodb.net/wikiDB?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
    UseNewURLParser: true
});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(function(req,res){
    Article.find({}, function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }else{
            res.send(err);
        }
    })
})

.post(function(req, res){
    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    })
    
    newArticle.save(function(err){
        if(!err){
            res.send("new article added.")
        }else{
            res.send(err);
        }
    });
})

.delete(function(req, res){
    Article.deleteMany({}, function(err){
        if (!err){
            res.send("all articles deleted");
        }else{
            res.send(err);
        }
    });
});

app.route("/articles/:articleTitle").
get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function (err, foundArticle){
        if(!err){
            res.send(foundArticle)
        }else{
            res.send(err);
        }
        
    })
})
.put(function(req, res){
    Article.replaceOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        function(err){
            if(!err){
                res.send("put: updated the article")
            }else{
                res.send(err);
            }
        }
    )
})

.patch(function(req,res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("patch: updated the article");
            }else{
                res.send(err);
            }
        }
    )
})

.delete(function(req, res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("deleted article: " + req.params.articleTitle)
            }else{
                res.send(err);
            }
        }
    )
})

app.listen(process.env.PORT || 3000, function() {
    console.log ("Server running on port 3000");
});