var cheerio = require("cheerio");

var Ville="courbevoie";
var departement='92400';

var url = "http://www.meilleursagents.com/prix-immobilier/"+Ville+"-"+departement+"/#estimates";

var http = require("http");


// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

download(url, function(data) {
  if (data) {

    var $ = cheerio.load(data);

    $('.prices-summary div').each(function(i, element){
      var a = $(this).next();
      console.log(a.text());
    });

  }
  else()
  	console.log(err);
});