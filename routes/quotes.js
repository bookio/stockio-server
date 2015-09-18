var router       = require('express').Router();
var uuid         = require('node-uuid');

var sprintf      = require('../sprintf');
var Server       = require('../server');
var sequelize    = require('../sequelize')

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

		server.reply({
			symbol: request.params.symbol,
			quotes: quotes
		});

	}).catch(function(error) {
		server.error(error);
	});
	
});


module.exports = router;
