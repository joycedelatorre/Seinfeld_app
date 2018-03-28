var express = require("express");
var mysql = require("mysql");

var app = express();

var port = 3000;

var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"toor",
	database:"Seinfeld_DB"
});

connection.connect(function(err){
	if (err){
		console.error("error connecting " + err.stock);
		return;
	}
	console.log("connected as id " + connection threadId);
});