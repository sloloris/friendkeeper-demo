var express = require('express'),
    path = require('path'),
    app = express(),
    defaultPort = 4444,
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    nunjucks = require('nunjucks'),
    isProduction = process.env.NODE_ENV == 'production';

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '')));

app.set('templates', path.join(__dirname, ''));
var env = nunjucks.configure(app.get('templates'), {
    autoescape: false,
    express:    app
});
app.set('view engine', 'nunjucks');

app.get('/', function(req, res){
    var title = 'FriendKeeper';
    res.render('index.html');
  });

  app.get('/*', function(req, res) {
    res.redirect('/');
  });

//Route not found -- Set 404
app.get('*', function(req, res) {
    res.json({
        "route": "This page does not exist! Please turn around and go back!"
    });
});

var port = process.env.PORT || 4444;
app.listen(port);
console.log('Server is Up and Running at Port : ' + port);