var Sequelize = require('sequelize');


// Make UTC dates behave...
require('pg').types.setTypeParser(1114, function(value) {
	return new Date(value + 'Z');
});



var sequelize = new Sequelize('ddn8phtcqde4l', 'uhqpqwzbptpxtw', 'S5BS0Wi4i5KxQLoYsV8f_ZMVvI', {
	host: 'ec2-54-235-151-252.compute-1.amazonaws.com',
	dialect: 'postgres',
	port:5432,
	protocol: 'postgres',
	//timezone: '+02:00',
	ssl: true,
	native: true
});



module.exports = sequelize;
