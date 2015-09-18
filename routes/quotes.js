var router       = require('express').Router();
var uuid         = require('node-uuid');

var sprintf      = require('../sprintf');
var Server       = require('../server');
var sequelize    = require('../sequelize')

var quotes = require('../model/quotes.js');

router.get('/:symbol', function (request, response) {

	var server = new Server(request, response);
	
	quotes.findAll({where: {symbol: request.params.symbol}}).then(function(rows) {
	
		var result = {};
		
		result.quotes = [];
		result.symbol = '';
		result.name   = '';
		
		rows.forEach(function(row) {
			if (result.symbol == '')
				result.symbol = row.data.symbol;
			if (result.name == '')
				result.name = row.data.name;
						
			row.data.quotes.forEach(function(quote) {
				result.quotes.push(quote);
			});
			
		});
		
		result.quotes.sort(function(a, b) {
			var dateA = new Date(a.date);
			var dateB = new Date(b.date);
			
			return dateA.getTime() - dateB.getTime();
		});

		
		server.reply(result);
/*
		var data = [];
		data.name = 
		rows.forEach(function(row) {
			
		});
		server.reply(data.data);
*/		
	}).catch(function(error) {
		server.error(error);
	});
	
});


module.exports = router;
