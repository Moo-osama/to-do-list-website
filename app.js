let express = require("express");
let bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

var listItems = ["One", "Two", "Three"];
var workItems = ["A", "B", "C"];

app.get('/', (req, res) => {
  var title = "Home";
  var date = new Date();
  var currentDay = date.getDay();
  var day = "";
  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
  }
  res.render('list', {
    listTitle: title, newListItems:listItems
  });


})

app.get("/work", function (req, res)
{
  var title = "Work";
  res.render('list', {
    listTitle: title, newListItems:workItems
  });
})

app.post("/", function (req, res)
{
  var item = req.body.inputItem;
  var page = req.body.pageName;

  if (page === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    listItems.push(item);
    res.redirect("/");
  }


})

app.listen(3000, function() {
  console.log("server is up and running");
})
