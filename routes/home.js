const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send("Hello! you're Home!");
});

module.exports = routes;