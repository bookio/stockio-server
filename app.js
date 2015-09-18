var express = require('express');
var app = express();
var cors = require('cors');
var sprintf = require('./sprintf.js');
var bodyParser = require('body-parser');
var sequelize = require('./sequelize.js');
var Sequelize = require('sequelize');



/*
var session = require('express-session');
 
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}));
*/


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());


app.use(bodyParser.json({limit: '50mb'}));
app.use('/stocks', require('./routes/stocks'));
app.use('/quotes', require('./routes/quotes'));



app.listen(app.get('port'), function() {
	console.log("Node app is running on port " + app.get('port'));
});




function sync() {
	var x = require('./model/quotes.js');
	x.sync();
	
}

function loadIt()  {

	var Foo = require('./foo.js');
	var foo = new Foo();

	var stocks = [

		{ 'name':'AT&T', 'symbol':'T' },
		{ 'name':'Ares Capital', 'symbol':'ARCC' },
		{ 'name':'Castellum', 'symbol':'CAST.ST' },
		{ 'name':'H&M', 'symbol':'HM-B.ST' },
		{ 'name':'NCC', 'symbol':'NCC-B.ST' },
		{ 'name':'Industrivärlden', 'symbol':'INDU-C.ST' },
		{ 'name':'Pfizer', 'symbol':'PFE' },
		{ 'name':'SHB', 'symbol':'SHB-B.ST' },
		{ 'name':'Guld',  'symbol':'GOLD' }	,
		{ 'name':'OMX Index',  'symbol':'^OMX' }	
	];
	
	stocks.forEach(function(stock){

/*
		foo.fetch(stock.symbol, 2006);
		foo.fetch(stock.symbol, 2007);
		foo.fetch(stock.symbol, 2008);
		foo.fetch(stock.symbol, 2009);
		foo.fetch(stock.symbol, 2010);
		foo.fetch(stock.symbol, 2011);
		foo.fetch(stock.symbol, 2012);
		*/
		foo.fetch(stock.symbol, 2013);
		foo.fetch(stock.symbol, 2014);

		foo.fetch(stock.symbol, 2015);
		
	});

	
	
}

//sync();

//loadIt();

module.exports = app;
