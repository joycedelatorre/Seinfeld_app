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
		console.error("error connecting " + err.stack);
		return;
	}
	console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res){
	//if they main route is hit, then we initiate a SQL query to grab all records.
	//all of the resulting records are stored in the variable "result"
	connection.query("SELECT * FROM actors", function (err, results){
		//We then build out html elements for the page.
		var html ="<h1> Seinfeld Actors </h1>"
		//Here we begin an unordered list
		html += "<ul>"
		for(var i=0; i< results.length; i++){
			html += "<li><p> ID: " + results[i].id + "</p>";
			html += "<p> actor: " + results[i].name + "</p>";
			html += "<p> coolness_points: " + results[i].coolness_points + "</p>";
			html += "<p> attitude: " + results[i].attitude + "</p></li>";
		}
		//we close our unordered list
		html += "</ul>";
		//finally we send the user the HTML file we dynamically created.
		res.send(html);
	});
});

app.get("/coolness_points", function (req, res){
	//if they main route is hit, then we initiate a SQL query to grab all records.
	//all of the resulting records are stored in the variable "result"
	connection.query("SELECT * FROM actors ORDER BY coolness_points DESC", function (err, results){
		//We then build out html elements for the page.
		var html ="<h1> Seinfeld Actors </h1>"
		//Here we begin an unordered list
		html += "<ul>"
		for(var i=0; i< results.length; i++){
			html += "<li><p> ID: " + results[i].id + "</p>";
			html += "<p> actor: " + results[i].name + "</p>";
			html += "<p> coolness_points: " + results[i].coolness_points + "</p>";
			html += "<p> attitude: " + results[i].attitude + "</p></li>";
		}
		//we close our unordered list
		html += "</ul>";
		//finally we send the user the HTML file we dynamically created.
		res.send(html);
	});
});

app.get("/:attitude", function (req, res){
	//if they main route is hit, then we initiate a SQL query to grab all records.
	//all of the resulting records are stored in the variable "result"
	var att = req.params.attitude;
	connection.query("SELECT * FROM actors WHERE attitude ='"+att+"'", function (err, results){
		//We then build out html elements for the page.
		var html ="<h1> Seinfeld Actors </h1>"
		//Here we begin an unordered list
		html += "<ul>"
		html += "<li><p> ID: " + results[0].name + "</p></li>";
		// for(var i=0; i< results.length; i++){
			// html += "<li><p> ID: " + results.id + "</p>";
			// html += "<p> actor: " + results.name + "</p>";
			// html += "<p> actor: " + results.coolness_points + "</p>";
			// html += "<p> actor: " + results.attitude + "</p></li>";
		// }
		//we close our unordered list
		html += "</ul>";
		//finally we send the user the HTML file we dynamically created.
		res.send(html);
	});
});

//Initiate the listener
	app.listen(port);