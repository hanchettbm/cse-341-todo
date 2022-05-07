const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./db/connect');

connect.initDatabase();

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', require('./routes'))

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})