// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var moment = require('moment');
var flash = require('connect-flash') ;
//var cors = require('cors')
var cookieParser = require('cookie-parser');

var session = require('express-session');

//...



//var session = require('express-session') 

// configuration ===========================================



	
// config files
var port = process.env.PORT || 8080; // set our port
var db = require('./config/db');



console.log(db)
// connect to our mongoDB database (commented out after you enter in your own credentials)
connectionsubject = mongoose.createConnection(db.urlSubjectViews);



// get all data/stuff of the body (POST) parameters

app.use(cookieParser('secret'));
app.use(session({cookie: { secure: true }}));
app.use(flash());

app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static('./public')); // set the static files location /public/img will be /img for users

//app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);




// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

 

// start app ===============================================
app.listen(port);	


console.log('API runs successully on the port ' + port ); // shoutout to the user