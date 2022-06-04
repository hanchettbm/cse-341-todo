const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send("Hello! you're Home!");
});

routes.get('/login', (req, res) => {
  res.render('login', {layout: 'login',});
});

routes.get('/dashboard', (req, res) => {
  res.render("dashboard");
});

module.exports = routes;