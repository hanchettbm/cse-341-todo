const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./db/connect');

connect.initDatabase();

app.use('/', require('./routes'))

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})