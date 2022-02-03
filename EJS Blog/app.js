//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.locals._ = _;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoURI = "mongodb+srv://william:Password@cluster0.8drqb.mongodb.net/blog?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
    useNewURLParser:true
})

const postsSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postsSchema);

const post1 = new Post ({
  title: "Day 1",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum id venenatis a condimentum vitae sapien. Convallis tellus id interdum velit laoreet. Ac feugiat sed lectus vestibulum. Sit amet dictum sit amet justo donec enim. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Eget gravida cum sociis natoque penatibus et magnis. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Proin fermentum leo vel orci porta non pulvinar neque. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Vitae tempus quam pellentesque nec nam aliquam sem. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Lacus luctus accumsan tortor posuere ac ut consequat semper viverra. Et sollicitudin ac orci phasellus egestas tellus rutrum. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Pellentesque sit amet porttitor eget dolor morbi non arcu risus."
});

const post2 = new Post ({
  title: "Day 2",
  content: "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Posuere lorem ipsum dolor sit amet. Leo in vitae turpis massa sed. Auctor urna nunc id cursus metus aliquam eleifend. Nec ullamcorper sit amet risus nullam. Aliquet risus feugiat in ante metus dictum. Cras sed felis eget velit aliquet sagittis. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Convallis convallis tellus id interdum velit. Non consectetur a erat nam. Mattis rhoncus urna neque viverra justo nec. Proin sed libero enim sed faucibus turpis in. Morbi tincidunt ornare massa eget."
});

const post3 = new Post ({
  title: "Day 3",
  content: "Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Posuere lorem ipsum dolor sit amet. Leo in vitae turpis massa sed. Auctor urna nunc id cursus metus aliquam eleifend. Nec ullamcorper sit amet risus nullam. Aliquet risus feugiat in ante metus dictum. Cras sed felis eget velit aliquet sagittis. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Convallis convallis tellus id interdum velit. Non consectetur a erat nam. Mattis rhoncus urna neque viverra justo nec. Proin sed libero enim sed faucibus turpis in. Morbi tincidunt ornare massa eget."
});

const defaultPosts = [post1, post2, post3];

app.get("/", function(req,res){

  Post.find({}, function(err, foundPosts){
    if(foundPosts.length === 0){
      Post.insertMany(defaultPosts, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("default posts loaded.");
        }
      });
    }else{
      res.render("home", {Content: homeStartingContent, Posts: foundPosts});
    }
    
  });

});

app.get("/about", function(req,res){
  res.render("about", {Content: aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {Content: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/compose", function(req,res){

  const newPost = new Post ({
    title: req.body.postTitle,
    content: req.body.postContent
  })
  
  newPost.save(function(err){
    if(!err){
      res.redirect("/")
    }
  });
});

app.get("/posts/:postId", function(req,res){

  const postId = req.params.postId;

  Post.findOne({_id: postId}, function(err, foundPost){
    if(!err){
      res.render("post", {Title: foundPost.title, Content: foundPost.content});
    }
  })


  // for(var i = 0; i < posts.length; i++){

  //   if (_.lowerCase(posts[i].title) === _.lowerCase(req.params.post)){
  //     res.render("post", {Title:posts[i].title, Content: posts[i].content});
  //   }else{
  //     console.log("no match");
  //   }
  // }
  
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
