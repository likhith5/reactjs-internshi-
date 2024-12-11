"use strict";

var express = require("express");

var cors = require("cors");

var products = require("./products");

var app = express();
app.use(express.json());
app.use(cors());
app.get("/", function (req, res) {
  res.send("Welcome our to online shop API...");
});
app.get("/products", function (req, res) {
  res.send(products);
});
var port = process.env.PORT || 5000;
app.listen(port, console.log("Server running on port ".concat(port)));