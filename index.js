var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongojs = require("mongojs");
var db = mongojs("birds");
var sightings = db.collection("sightings");
var port = 8000;

var app = express();

app.use(bodyParser.json());
app.use(cors());


app.post("/api/sighting", function (req, res) {
	sightings.insert(req.body, function (err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

app.get("/api/sighting/", function (req, res) {
	sightings.find(req.query, function (err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

app.put("/api/sighting", function (req, res) {
	sightings.update({"_id": mongojs.ObjectId(req.query.id)}, req.body, function (err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

app.delete("/api/sighting", function (req, res) {
	sightings.remove({"_id": mongojs.ObjectId(req.query.id)}, function (err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	});
});

app.listen (port, function () {
	console.log("Listening on port " + port);
});