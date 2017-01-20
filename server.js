var leboncoin = require('./js/leboncoin');
var meilleursagents = require('./js/meilleursagents');
var jsonleboncoin = require('./result_LeBonCoin');
var jsonmeilleursagents =  require('./result_MeilleursAgents');

var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var app = express();
app.use(express.static('web'));
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/myserver', function(req, res){
	
res.sendFile( __dirname  + '/web/index.html');

});


app.post('/myserver', function(req, res) {
  var url = req.body.url; 
  //Non terminé
 
});


var server = app.listen(8080, function () {

  var port = '8080';

  console.log("Server listening at http://localhost:%s", port)
})

