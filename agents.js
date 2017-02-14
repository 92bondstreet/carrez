let request = require('request');
let cheerio = require('cheerio');
let modLeboncoin = require('./leboncoin')


;

exports.scrap = (url,callback) =>{


	request(url,(er,resp,body) =>{
	let $ = cheerio.load(body);

	let avPriceFlat = $('.small-4.medium-2.columns.prices-summary__cell--median').first().text()
	let $avPriceFlat = Number(avPriceFlat.replace(/[^0-9\.]+/g,""));

	let avPriceHouse =  $('.small-4.medium-2.columns.prices-summary__cell--median').eq(1).text()
	let $avPriceHouse =  Number(avPriceHouse.replace(/[^0-9\.]+/g,""));

	let agents = {
			flat  : $avPriceFlat,
			house  : $avPriceHouse,
			}
			callback(agents)

	})



}
