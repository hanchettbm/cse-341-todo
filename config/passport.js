const GoogleStratagey = require('passport-google-oauth20').Strategy;
const User = require('../controllers/user');

module.exports = function (passport) {
    passport.use(new GoogleStratagey({
        clientID: '123600961674-qd0l5dgnhnoe627h3nva3ou88c3268ul.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: '/auth/google/callback' 
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser( (id, done) => {
        User.findBtid(id, (err, user) => done(err, user));
    })


}