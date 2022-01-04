var express = require("express");
var mongoose = require("mongoose");
const path = require('path');
var bodyParser = require("body-parser");
var app = express();

//app.set('views', path.join(__dirname  , 'public'));
app.set("view engine", "ejs");
app.use(express.static("../frontend/public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://Nardine:nardine123@172.30.172.159:27017/todolistDB");

const itemSchema = {
  name: String,
};

const users = [ {name: 'u1', password: '123'},  {name: 'u2', password: '123'}]


const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({ name: "Welcome to ItBuddies" });
const item2 = new Item({ name: "Like, Share and Subscribe" });
const item3 = new Item({ name: "Enjoy learning" });

const d = [item1, item2, item3];

app.get("/", function (req, res) {
  Item.find({}, function (err, f) {
    if (f.length === 0) {
      Item.insertMany(d, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved items to database");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { newListItem: f });
    }
  });
});

app.post("/", function (req, res) {
  i = req.body.n;  //condition is here
  if(i.length != 0){
  const item = new Item({name: i, });

   item.save();
    res.redirect("/");
  }
});

app.post("/login",function(req,res) {
  for (let index = 0; index < users.length; index++) {
    const element = users[index];


    if(element.name == req.body.userrname){
      if(element.password == req.body.password){
        //redirect
        console.log("logged in success");
        res.redirect("tasks");
      }else{
        // 
      }
    }
  }
  


});



app.post("/delete", function (req, res) {
  Item.findByIdAndRemove(req.body.checkbox, function (err) {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("listening on port 3000.");
});