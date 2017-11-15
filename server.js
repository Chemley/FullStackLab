// Server.js. Must have the top two lines always.
var express = require("express");
var app = express();
var inMemoryDatabase = require("./in-memory-database");
var bodyParser = require ("body-parser");
var db = inMemoryDatabase();

var items = [
  {name: "Fish", price: 20},
  {name: "Carrots", price: 2.5}
];

db.init(items);

app.use(bodyParser.json());

app.get("/api/items", function (req, res) {
 res.send(db.readAll());
});

app.post("/api/items", function (req, res) {
  db.create(req.body);
 res.send("Okay");
});

app.put("/api/items/:id", function (req, res) {
  var id = req.params.id;
  var food = req.body;
  db.update(id, food);
  res.send("Updated!");
});

app.delete("/api/items/:id", function (req, res) {
  var id = req.params.id;
  db.delete(id);
  res.send("Deleted!");
});

// To get any part of the arry, you can type aftere the slash ":id"
//console.log here shows if it's going to print the id for the opbject that you're looking for. This
// will print in the terminal
// then create a var and set it to req.params.id
app.get("/api/items/:id", function (req, res) {
  var id = req.params.id;
  console.log(id)
 res.send(db.read(id));
});

var server = app.listen(5000, function () {
 var port = server.address().port;
 console.log("App's server listening at http://localhost:%s", port);
});
