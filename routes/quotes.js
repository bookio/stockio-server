var router       = require('express').Router();
var uuid         = require('node-uuid');
var Promise      = require('promise');
var util         = require('util');
var request      = require('request');
var events       = require('events');
var extend       = require('extend');

var sprintf      = require('../sprintf.js');
var Server       = require('../server.js');
var sequelize    = require('../sequelize.js');




function fetch(symbol, year) {
	
	return new Promise(function (resolve, reject) {

		var template = 'select * from yahoo.finance.historicaldata where symbol = "%s" and startDate = "%04d-01-01" and endDate = "%04d-12-31"';
		var query    = sprintf(template, symbol, year, year);
	
		var url = '';
		
		url += 'https://query.yahooapis.com/v1/public/yql?q='
		url += encodeURIComponent(query);
		url += '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
	
		
		request(url, function (error, response, body) {
			try {
				if (error)
					throw error;
					
				if (response.statusCode == 200) {
					var json = JSON.parse(body);
					var results = json.query.results.quote;
					
					if (!util.isArray(results))
						results = [results];
	
					var quotes = [];
					
					results.forEach(function(result) {
						var item = {};
						//item.low   = parseFloat(result.Low);
						//item.high  = parseFloat(result.High);
						//item.open  = parseFloat(result.Open);
						item.quote = parseFloat(result.Close);
						item.date  = result.Date;
						quotes.push(item);
						
					});
	

					
					resolve(quotes);


					console.log('Loaded', symbol, year);
				}
				else
					throw new Error('Invalid status code');
			}
			catch(error) {
				console.log('***************error', error);
				resolve([]);
			}
			
		});


	});	
	
}


router.get('/:symbol', function (request, response) {

	var server = new Server(request, response);
	
	var promises = [];
	
	promises.push(fetch(request.params.symbol, 2015));
	promises.push(fetch(request.params.symbol, 2014));
	
	Promise.all(promises).then(function(results) {

		var quotes = [];
		
		results.forEach(function(item) {
			quotes.push.apply(quotes, item);
		});

		quotes.sort(function(a, b) {
			var dateA = new Date(a.date);
			var dateB = new Date(b.date);
			
			return dateA.valueOf() - dateB.valueOf();
		});		

		quotes.push.apply(quotes, b)
		
	});
		server.reply(quotes);
	});
	
});

	




/*
Quotes = require('./model/quotes.js');

var quotes = require('../model/quotes.js');

router.get('/:symbol', function (request, response) {

	var server = new Server(request, response);
	
	quotes.findAll({where: {symbol: request.params.symbol}}).then(function(rows) {
	
		var quotes = [];
		
		rows.forEach(function(row) {
			row.quotes.forEach(function(quote) {
				quotes.push(quote);
			});
			
		});

		quotes.sort(function(a, b) {
			var dateA = new Date(a.date);
			var dateB = new Date(b.date);
			
			return dateA.getTime() - dateB.getTime();
		});


		server.reply({
			symbol: request.params.symbol,
			quotes: quotes
		});

	}).catch(function(error) {
		server.error(error);
	});
	
});

*/

module.exports = router;
