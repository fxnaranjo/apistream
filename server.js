var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');
  


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/streamingRoutes'); //importing route
routes(app); //register the route


app.listen(3000, '0.0.0.0');


console.log('todo list RESTful API server started on: ' + port);