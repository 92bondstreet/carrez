var cheerio = require("cheerio");

var url = "http://www.leboncoin.fr/ventes_immobilieres/915700197.htm?ca=12_s";
var http = require("http");
var fs = require('fs');
var request = require('request');
var express = require('express');
const util = require('util');


// Utility function that downloads a URL and invokes
// callback with the data.
var price, town, postCode, Type, rooms, surface;


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

module.exports = function(url, callback){
download(url, function(data)  {
  if (data) {
    // console.log(data);
    var $ = cheerio.load(data);
   var price = $('span.price');
   console.log("this is the price "+price.text());


  var town =$('.lbcParams td[itemprop="addressLocality"]').text();
  console.log("this is the town "+ town);


  var postCode = $('.lbcParams td[itemprop="postalCode"]').text();
  console.log("this is the post code "+ postCode);


 //div.lbcParams.criterias > table > tbody > tr:nth-child(1) > td
  var Type = $('div[class="lbcParams criterias"] tr td').first().text();

  console.log("this is the type "+ Type );

  var rooms = $('div[class="lbcParams criterias"] tr td').children().text();
  console.log("this is the nbr of rooms "+ rooms );


  var surface = $('div[class="lbcParams criterias"] tr td').last().text();
  console.log("this is the surface "+ surface );

  return callback( {price,town,postCode,Type,rooms,surface} )
  }
});
}



