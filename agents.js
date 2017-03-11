var request = require('request'),
    cheerio = require('cheerio'),
    modLeboncoin = require('./leboncoin');

exports.scrap = (url, callback) => {
	request(url, (er,resp,body) => {
	let $             = cheerio.load(body),
	    avPriceFlat   = $('.small-4.medium-2.columns.prices-summary__cell--median').first().text(),
	    $avPriceFlat  = Number(avPriceFlat.replace(/[^0-9\.]+/g,"")),
	    avPriceHouse  =  $('.small-4.medium-2.columns.prices-summary__cell--median').eq(1).text(),
	    $avPriceHouse =  Number(avPriceHouse.replace(/[^0-9\.]+/g,""));

	let agents = {
			flat  : $avPriceFlat,
			house  : $avPriceHouse,
			}
			callback(agents)
	});
}
