var Sequelize = require('sequelize');
var sequelize = require('../sequelize.js');

module.exports = sequelize.define('quotes', {
	
	'symbol': {
		type          : Sequelize.STRING,
		allowNull     : false,
		unique        : 'compositeIndex'
	},

	'year': {
		type          : Sequelize.INTEGER,
		allowNull     : false,
		unique        : 'compositeIndex'
	},
	
	'quotes': {
		type          : Sequelize.JSON,
		allowNull     : false,
		defaultValue  : {}
	},

	
	
}, { 
	updatedAt: 'updated_at', 
	createdAt: 'created_at'
});



