let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');


exports.scrap = (url,callback) => {


	request(url,(er,resp,body) => {
		let $ = cheerio.load(body)

		let data=$(this)
		let prev = $(this).prev();

		let $type

		let price = $("h2[itemprop = 'price']");
		let $price = parseInt($(price).attr('content'));

		let address = $("span[itemprop = 'address']");
		let $address = address.text();

		$(".value").each(function(){

			data=$(this);
			parent=$(this).prev();

			if(parent.text() === "Type de bien"){
				$type = data.text()
			}

			if(parent.text() === "Surface"){
				$surface = parseInt(data.text())
			}
			});


			//let surface = $('.value');
			//let $surface = parseInt(surface[5].children[0].data);


			leboncoin = {
				price : $price,
				address : $address,
				type : $type,
				surface : $surface
			}

			

			callback(leboncoin)

})
}
