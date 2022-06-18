const routes = require('express').Router();
const passport = require('passport');

routes.get('/google', passport.authenticate('google', {scope: ['profile']}));

routes.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/dashboard');
});

routes.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    res.redirect('/');
})

module.exports = routes;