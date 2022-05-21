const routes = require('express').Router();

routes.use('/', require('./swagger'));

routes.use('/', require('./home'));

routes.use('/tasks', require('./tasks'));

module.exports = routes;