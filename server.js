var modLeboncoin = require('./leboncoin'),
    modAgents = require('./agents'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// MOTEUR DE TEMPLATE
app.set('view engine','ejs')

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

// ROUTES
app.get('/', (request,response) => {
	response.render('pages/index');
});
app.post('/',(request,response)=> {
	let link = request.body.link;

	if( link === undefined || link === '') {
		response.render('pages/index', {error:'Message vide'});
	}

	modLeboncoin.scrap( link, (data1) => {

			let result;
			let city;
			let code;
			let urlAgent;
			let diff;
			let propPrice;
			let avPrice

			// Récuperation et traitement de la ville pour la ré-inserer
			// avec le bon format dans l'url meilleursagents
			let fullCity = data1.address.trim()
			let nbesp = fullCity.split(' ').length - 1;
			let tabCity = fullCity.split(' ')

			if(nbesp > 1){

				code = tabCity[tabCity.length-1]
				tabCity.pop()
				city = tabCity.join('-').toLowerCase()

				} else {

					code = tabCity[1]
					city = tabCity[0].toLowerCase()

				}

				urlAgent = "https://www.meilleursagents.com/prix-immobilier/"+city+"-"+code;

			modAgents.scrap(urlAgent,(data2) => {

			if(data1.type === "Appartement"){

				let price = data1.surface * data2.flat;
				diff = data1.price - price;

				if(diff > 0){
					result = '- '+diff+'€';
				} else {
					result = '+ '+diff+'€';
				}

			propPrice = 'Price of the property : '+data1.price+'€';
			avPrice = 'Average price in this city : '+price+' €'

			} else if (data1.type === "Maison") {

				let price = data1.surface * data2.house;
				diff = data1.price - price;

				if(diff > 0){
					result = '- '+diff+'€';
				} else {
					result = '+ '+diff+'€';;
				}

				propPrice = 'Price of the property : '+data1.price+'€';
				avPrice = 'Average price in this city : '+price+' €'

			} else {
				result = "Désolé, nous ne traitons pas ce genre d'information"
			}

			response.render('pages/index',{result,propPrice,avPrice});
		});
	});
});
app.listen(8080);
