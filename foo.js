var util     = require('util');
var request  = require('request');
var events   = require('events');
var extend   = require('extend');
var sprintf  = require('./sprintf.js');

var Model = {};
Model.Stocks = require('./model/stocks.js');

module.exports = function() {

	var self = this;

	
	function fetch(symbol, year) {
		
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
	
					var data = [];
					
					results.forEach(function(result) {
						var item = {};
						item.symbol = result.Symbol;
						item.low = parseFloat(result.Low);
						item.high = parseFloat(result.High);
						item.open = parseFloat(result.Open);
						item.close = parseFloat(result.Close);
						item.date = result.Date;

						// Save it
						Model.Stocks.upsert(item);

						console.log(item);
					});
					
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




	


