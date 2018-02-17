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
//bring in User Models
let User = require('./models/user');
//bring in Recycle Models
let Recycle = require('./models/recycle');

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
    User.find({}, (err, users) => {
        if (err){
            console.log(err);
        }else{
            res.render('index', {
                title: 'Add Recycle Item',
                users: users
            });
        }
    });
});

// //AddItem GET route
// app.get('/addReycle', (req, res) => {
//     User.find({}, (err, users) => {
//         if (err){
//             console.log(err);
//         }else{
//             res.render('addReycle', {
//                 title: 'Add Recycle Item',
//                 users: users
//             });
//         }
//     });
// });

app.post('/addItem', (req, res) => {
    const locname = req.body.locname;
    const type = req.body.type;
    const qnty = req.body.qnty;
    
    req.checkBody('locname', 'Location Name is Required..').notEmpty();
    req.checkBody('type', 'Quanity is required.').notEmpty();
    req.checkBody('qnty', 'Quanity of items is required..').notEmpty();

    let errors = req.validationErrors();

    if (errors){
        res.render('createMarker', {
            title: 'Add Reycle Item',
            errors:errors
        });
    }else {
        let newRecyle = new Recycle({
            locname: locname,
            type: type,
            qnty: qnty,
            creator: req.user._id
        });
        console.log(newRecyle.lat);

        newRecyle.save( (err) => {
            if (err){
                console.log(err);
                return;
            }else{
                req.flash('success', 'Great job on recyling.');
                res.redirect('/index');
            }
        });
    }
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