var util     = require('util');
var request  = require('request');
var events   = require('events');
var extend   = require('extend');
var sprintf  = require('./sprintf.js');

Quotes = require('./model/quotes.js');

module.exports = function() {

	var self = this;

	
	function fetch(symbol, name, year) {
		
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
	
					var data = {};
					
					data.symbol = symbol;
					data.quotes = [];
					data.name = name;
					
					results.forEach(function(result) {
						var item = {};
						item.low = parseFloat(result.Low);
						item.high = parseFloat(result.High);
						item.open = parseFloat(result.Open);
						item.close = parseFloat(result.Close);
						item.date = result.Date;
						data.quotes.push(item);
						
					});
					/*
					data.quotes.sort(function(a, b) {
						var dateA = new Date(a);
						var dateB = new Date(b);
						
						if (a < b)
							return -1;
						if (a > b)
							return 1;
						return 0;
						//return dateA.valueOf() - dateB.valueOf();
					});
					*/
					//console.log(data.quotes);

					var record = {};
					record.symbol = symbol;
					record.year = year;
					record.data = data;
					// Save it
					Quotes.upsert(record);

					
				}
				else
					throw new Error('Invalid status code');
			}
			catch(error) {
				console.log(error);
					
			}
			
		});
	}
	
	this.fetch = fetch;
	
	
}




	


