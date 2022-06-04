const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const connect = require('./db/connect');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');

// dotenv.config( { path: './.env'});
require('./config/passport')(passport);


connect.initDatabase();


app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept', 'Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'))

// Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main' ,extname: '.hbs'}));
app.set('view engine', '.hbs');

// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

// Passport 
app.use(passport.initialize());
app.use(passport.session());



app.listen(port, () => {
    console.log(`Running on port ${port}`)
})