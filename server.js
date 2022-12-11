var express = require('express'),
  fs = require('fs-extra'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

const https = require("https");
  
  var privateKey = fs.readFileSync( '/certificates/privkey.pem' );
  var certificate = fs.readFileSync( '/certificates/fullchain.pem' );
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/streamingRoutes'); //importing route
routes(app); //register the route


https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(port,'0.0.0.0');



console.log('todo list RESTful API server started on: ' + port);