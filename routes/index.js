const routes = require('express').Router();

// routes.get('/', (req, res) => {
//   res.send('Samantha Jarnagin');
// });

routes.use('/', require('./home'));

routes.use('/contacts', require('./contacts'));

module.exports = routes;