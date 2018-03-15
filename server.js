const express = require('express');
const http = require('http');
const session = require('express-session');

const config = require('./config');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/mainRoutes');
const homePageRoutes = require('./routes/homePageRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/src'));

app.use('*', mainRoutes);

http.createServer(app).listen(config.get('port'), function() {
    console.log('Express server listening on port ' + config.get('port'));
});
