import passport from 'passport';
import Strategy from 'passport-auth0';
import {config} from "dotenv";
import {resolve} from "path";

config({ path: resolve(__dirname, "../.env") });


const strategy = new Strategy.Strategy(
    {
        domain: process.env.AUTH0_DOMAIN || "",
        clientID: process.env.AUTH0_CLIENT_ID || "",
        clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
        callbackURL:
            process.env.AUTH0_CALLBACK_URL || 'http://localhost:4000/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

passport.use(strategy);

export default passport;