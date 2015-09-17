var Sequelize = require('sequelize');
var sequelize = require('../sequelize.js');

module.exports = sequelize.define('stocks', {
	
	'symbol': {
		type          : Sequelize.STRING,
		allowNull     : false,
		unique        : 'compositeIndex'
	},

	'date': {
		type          : Sequelize.DATE,
		allowNull     : false,
		unique        : 'compositeIndex'
	},

	
	'high': {
		type          : Sequelize.FLOAT,
		allowNull     : true
	},
	
	'low': {
		type          : Sequelize.FLOAT,
		allowNull     : true
	},
	
	'close': {
		type          : Sequelize.FLOAT,
		allowNull     : true
	},
	
	
}, { 
	updatedAt: 'updated_at', 
	createdAt: 'created_at'
});



