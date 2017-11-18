// Server.js. Must have the top two lines always.
var express = require("express");
var app = express();
var bodyParser = require ("body-parser");
var pg = require("pg");
var pool = new pg.Pool({
 user: "postgres",
 password: "MyP@ssw0r5",
 host: "localhost",
 port: 5432,
 database: "postgres",
 ssl: false
});

app.use(bodyParser.json());

app.get("/api/items", function (req, res) {
 pool.query("SELECT * FROM shopping_list").then(function(result){
   res.send(result.rows);
 }).catch(function(err){
   console.log(err);
   res.status(500);
   res.send("OOPS");
 });
});

app.post("/api/items", function (req, res) {
  var items = req.body;
  var sql = "INSERT INTO shopping_list(item, cost)" + "values($1::text, $2::int)";
  var values = [items.item, items.cost];
  pool.query(sql, values).then(function(){
    res.send('added');
  }).catch(function(err){
    console.log(err);
    res.status(500);
    res.send("OOPS");
  });
 });

 app.delete("/api/items", function (req, res) {
   var id = req.params.id;
   var sql = "DELETE FROM shopping_list WHERE id=$1::int";
   pool.query(sql, [id]).then(function(){
     res.send('deleted');
   }).catch(function(err){
     console.log(err);
     res.status(500);
     res.send("OOPS");
   });
  });

// app.put("/api/items/:id", function (req, res) {
//   var id = req.params.id;
//   var food = req.body;
//   db.update(id, food);
//   res.send("Updated!");
// });


// To get any part of the [], you can type aftere the slash ":id"
//console.log here shows if it's going to print the id for the opbject that you're looking for. This
// will print in the terminal
// then create a var and set it to req.params.id


var server = app.listen(5000, function () {
 var port = server.address().port;
 console.log("App's server listening at http://localhost:%s", port);
});
