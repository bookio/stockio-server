


var router       = require('express').Router();
var uuid         = require('node-uuid');

var sprintf      = require('../sprintf');
var Server       = require('../server');
var sequelize    = require('../sequelize')

var stocks = require('../model/stocks.js');

router.get('/:symbol', function (request, response) {

	var server = new Server(request, response);
	
	stocks.findAll({where: {symbol: request.params.symbol}, order: [['date', 'ASC']]}).then(function(stocks) {
	
		server.reply(stocks);
		
	}).catch(function(error) {
		server.error(error);
	});
	
});


	module.exports = router;

