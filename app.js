var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({ name: "Base of list" });


const d = [item1];

app.get("/", function (req, res) {
  Item.find({}, function (err, f) {
    if (f.length == 0) {
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

app.post("/delete", function (req, res) {
  Item.findByIdAndRemove(req.body.checkbox, function (err) {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
});
/*
app.put("/edit" , function (req, res){
    Item.findByIdAndUpdate(req.body.checkbox, function (err) {
        if (!err) {
            i = req.body.n;  //condition is here
            if(i.length != 0)
            {
             const item = new Item({name: i, });
             item.save();
             console.log("Successfully updated");
             res.redirect("/");
           }
        };
    })
});


app.post("/login" , function(req , res ){

  if (!email || !password) return res.send("Please enter all the fields");

  const Exits = await User.findOne({ email });

    if (!Exits) return res.send("invalid username or password");

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) return res.send("invalid useranme or password");

});

app.post("/register" , function(req , res ){
  const { email, password } = req.body;

    
    if (!email || !password) return res.send("Please enter all the fields");

    const doesUserExitsAlreay = await User.findOne({ email });

    if (doesUserExitsAlreay) return res.send("A user with that email already exits please try another one!");


    const latestUser = new User({ email, password: hashedPassword });

    latestUser.save();
    latestUser.then(() => {
        res.send("registered account!");
        res.redirect("/login");
      })
      .catch((err) => console.log(err));
  });



router.get('/logout', function(req, res, next) {
  req.logout();
  req.session = null;
  res.redirect('/');
});
*/

app.listen(3000, function () {
  console.log("listening on port 3000.");
});