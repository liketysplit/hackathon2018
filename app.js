const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
//const firebase = require('firebase');
//const functions = require('firebase-functions');
//const fbadmin = require('firebase-admin');

mongoose.connect(config.database);
let db = mongoose.connection;

//check connection
db.once('open', () => {
    console.log('Connected To MongoDB');  
});

//Check for db errors
db.on('error', (err) => {
    console.log(err);
});

// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyBiwd68R8s6P0VQbVioigYiqkzjdd0_vk8",
//     authDomain: "nodekb-1.firebaseapp.com",
//     databaseURL: "https://nodekb-1.firebaseio.com",
//     storageBucket: "nodekb-1.appspot.com",
//   };
// firebase.initializeApp(firebaseConfig);
// fbadmin.initializeApp(functions.config().firebase);
// var serviceAccount = require('path/to/serviceAccountKey.json');

// fbadmin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://nodekb-1.firebaseio.com'
// });

//init app
const app = express();

//bring in Models
let Article = require('./models/article');

// Load View Engine
// app.set('views', path.join(__dirname, './views'));
app.set('views', './views')
app.set('view engine', 'pug');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, './public')));


// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator Middleware
//app.use(expressValidator(middlewareOptions));
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//Home route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err){
            console.log(err);
        }else{
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });
});

// // Map Route
// app.get('/maps/map', (req, res) => {
//     res.render('map', {
//         title: 'Google Maps'
//     });
// });

// Route Files
let articles = require('./routes/articles');
app.use('/articles', articles);
app.use(function(err, req, res, next) {});

// Route Users
let users = require('./routes/users');
app.use('/users', users);
app.use(function(err, req, res, next) {});

// Route Map
let maps = require('./routes/maps');
app.use('/maps', maps);
app.use(function(err, req, res, next) {});


//start server
app.listen(3000, () => {
    console.log('Server started on port 3000....');
});