var modLeboncoin = require('./leboncoin'),
        modAgents = require('./agents'),
        express = require('express'),
        app = express(),
        bodyParser = require('body-parser');

// MOTEUR DE TEMPLATE
app.set('view engine','ejs');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


// ROUTES
app.get('/', (request,response) => {
	response.render('pages/index');
	console.log('Carrez: \n Example to take: \n https://www.leboncoin.fr/ventes_immobilieres/1096652386.htm?ca=12_s');
});



app.post('/',(request,response)=> {
    	let link = request.body.link;

    	if( link === undefined || link === '') {
    		response.render('pages/index', {error:'No link detect, please enter a link'});
    	} else if( link.indexOf('https://www.leboncoin.fr/ventes_immobilieres/') == -1){
        response.render('pages/index', {error:'Please check if your link is conform ( ex : https://www.leboncoin.fr/ventes_immobilieres/...)'});
      } else  {

      try {

    	modLeboncoin.scrap( link, (data1) => {

    			let result;
    			let city;
    			let code;
    			let urlAgent;
    			let diff;
    			let propPrice;
    			let avPrice;

    			// Récuperation et traitement de la ville pour la ré-inserer
    			// avec le bon format dans l'url meilleursagents
    			let fullCity = data1.address.trim();
    			let nbesp = fullCity.split(' ').length - 1;
    			let tabCity = fullCity.split(' ');

    			if(nbesp > 1){

    				code = tabCity[tabCity.length-1];
    				tabCity.pop();
    				city = tabCity.join('-').toLowerCase();

    				} else {

    					code = tabCity[1];
    					city = tabCity[0].toLowerCase();

    				}

    				urlAgent = `https://www.meilleursagents.com/prix-immobilier/${city}-${code}`;

    		modAgents.scrap(urlAgent,(data2) => {

    			if(data1.type === "Appartement"){

    				let price = data1.surface * data2.flat;
    				diff = price - data1.price ;

    				if(diff < 0){
              diff = diff*(-1);
    					result = `- ${diff} €`;
    				} else {
              result = `+ ${diff} €`;
    				}

    			propPrice = `Price of the property : ${data1.price} €`;
    			avPrice = `Average price in this city (${city}) : ${price} €`

    			} else if (data1.type === "Maison") {

    				let price = data1.surface * data2.house;
    				diff = price - data1.price;

    				if(diff < 0){
              diff = diff*(-1);
              result = `- ${diff} €`;
    				} else {
              result = `+ ${diff} €`;
    				}

            propPrice = `Price of the property : ${data1.price} €`;
            avPrice = `Average price in this city (${city}) : ${price} €`

    			} else {
    				result = "Sorry, we do not treat this kind of property";
    			}

    			response.render('pages/index',{result,propPrice,avPrice});
    		});
    	});
    }

    catch (error) {

      response.render('pages/index', {error:'Please enter a link'});
    }
}
    });
app.listen(8080);
