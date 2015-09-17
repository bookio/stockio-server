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



app.listen(app.get('port'), function() {
	console.log("Node app is running on port " + app.get('port'));
});

/*
var x = require('./model/stocks.js');
x.sync();
*/


var Foo = require('./foo.js');
var foo = new Foo();
//foo.fetch('HM-B.ST', 2014);
//foo.fetch('INDU-C.ST', 2015);


module.exports = app;
