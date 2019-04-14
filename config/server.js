const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

//middleware express-static
app.use(express.static('./app/public'));

//middleware body-parser
app.use(bodyParser.urlencoded({extended : true}));

//middleware express-validator
app.use(expressValidator());

// create autoload for routes, models, controllers and object app
consign()
    .include('./app/routes')
    .then('./app/models')
    .then('./app/controllers')
    .into(app)

module.exports = app;


