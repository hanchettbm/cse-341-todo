const routes = require('express').Router();

routes.use('/', require('./swagger'));

routes.use('/', require('./home'));

routes.use('/tasks', require('./todotasks'));

routes.use('/user', require('./user'));

routes.use('/auth', require('./auth'));

module.exports = routes;