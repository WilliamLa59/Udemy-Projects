const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


const mongoURI = "mongodb+srv://william:Password@cluster0.8drqb.mongodb.net/todoList?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
    useNewURLParser:true
})

const itemsSchema = {
    name: String
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
}); 

const item2 = new Item({
    name: "Hit the + button to add a new item."
}); 

const item3 = new Item({
    name: "<-- Hit this to delete an item."
}); 

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema)

app.get('/favicon.ico', function(req, res) {
    res.status(204);
    res.end();
});

app.get('/', function(req, res){

    Item.find({}, function(err, foundItems){

        if(foundItems === 0 ) {
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("default items saved.")
                }
            });
        }else{
            res.render("list", {listTitle: "Today", newItems: foundItems});
        }

    });
    
});

app.post('/', function(req, res){

    const itemName = req.body.newItem;
    const listTitle= req.body.list;

    const additem = new Item ({
        name: itemName
    });

    if(listTitle === "Today"){
        additem.save();
        res.redirect("/")
    } else {
        List.findOne({name: listTitle}, function(err, foundList){
            
            foundList.items.push(additem);
            foundList.save();
            res.redirect("/"+ listTitle);
        })
    }
});

app.post('/delete', function(req, res){
    const checkedItemId = req.body.checkbox;
    const listTitle = req.body.listName;

    if(listTitle === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if(!err){
                console.log("removed id: " + checkedItemId);
                res.redirect("/");
            }    
        });
    }else{
        List.findOneAndUpdate({name: listTitle},{$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
            if(!err){
                res.redirect("/"+listTitle);
            }
        });
    }
    
   
});

app.get("/:newList", function(req, res){
    
    const customListName = _.capitalize(req.params.newList);

    List.findOne({name: customListName}, function(err, foundList){
        if(!err) {
            if(!foundList){
                //Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
            
                list.save();
                res.render("/"+customListName);
            }else{
                //show an existing list
                res.render("list", {listTitle: foundList.name, newItems: foundList.items})
            }
        }
    })
    
});

// app.post("/work",function(req, res){
//     let item = req.body.newItem
//     workItems.push(item);
//     res.redirect("/work")
// });

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
    console.log ("Server running on port 3000");
});