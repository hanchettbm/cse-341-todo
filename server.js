path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); 

// Load config 
dotenv.config( { path: './config/config.env'});

require('./config/passport')(passport);

connectDB();

const app = express();

// Body Parser 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// Method Override
app.use (methodOverride (function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it 
    let method = req.body._method 
    delete req.body._method
    return method
  }
}))


// Logging 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan ('dev'));
};

// Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main' ,extname: '.hbs'}));
app.set('view engine', '.hbs');

// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl:process.env.MONGODB_URI}),
}));

// Passport 
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept', 'Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes'))


app.listen(port, () => {
    console.log(`Running on port ${port}`)
})