const routes = require('express').Router();

routes.use('/', require('./swagger'));

routes.use('/', require('./home'));

routes.use('/tasks', require('./tasks'));

routes.use('/auth', require('./auth'));

module.exports = routes;