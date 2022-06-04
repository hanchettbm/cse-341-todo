const GoogleStratagey = require('passport-google-oauth20').Strategy;
const User = require('../controllers/user');

module.exports = function (passport) {
    passport.use(new GoogleStratagey({
        clientID: '123600961674-qd0l5dgnhnoe627h3nva3ou88c3268ul.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/callback' 
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.id })

            if (user) {
                done(null, user)
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err){
            console.error(err);
        }

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser( (id, done) => {
        User.findBtid(id, (err, user) => done(err, user));
    })


}