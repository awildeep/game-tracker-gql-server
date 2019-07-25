import express from 'express';
import {
    ApolloServer,
    AuthenticationError,
} from 'apollo-server-express';
import resolvers from './resolvers'
import { resolve } from "path"
import { config } from "dotenv"
import typeDefs from "./typeDefs";
import passport from "./auth0";
import session from 'express-session';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import {getMe} from "./resolvers/auth/query/Me";

config({ path: resolve(__dirname, "../.env") });


const app = express();
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

const validateToken = async(token) => {
    if (token) {
        try {
            return await jwt.verify(token, process.env.JWT_SECRET || "");
        } catch (e) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }
};

const unauthorizedOperations = [
    'SignUp',
    'SignIn'
];

const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        tracing: process.env.NODE_ENV === 'development',
        context: async ({ req }) => {
            // get the access token from the headers
            const token = req.headers[process.env.TOKEN_NAME || "authorization"] || '';

            const tokenContents = await validateToken(token);

            let me = {  //Default guest user
                user_id: 0,
                username: 'guest@game-tracker.com',
                name: 'Guest User',
                password: '',
                admin: false,
                can_login: false
            };

            if (token) {
                me = await getMe((<any>tokenContents).user_id || "");
            }

            // add the token to the context
            return {
                token,
                me,
                tokenContents,
                jwt_secret: process.env.JWT_SECRET || "",
            };
        }
    }
);


server.applyMiddleware({ app, path: '/graphql' });

app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/login' }),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect("/");
    }
);

app.get('/login',
    passport.authenticate('auth0', {}), function (req, res) {
        res.redirect("/");
    });

app.listen({ port: process.env.GQL_PORT || 4000 }, () => {
    console.log('Apollo Server on http://localhost:4000/graphql');
});





//
// server.listen(
//     {
//         port: process.env.GQL_PORT || 4000
//     }
// ).then(({ url }) => {
//     const envKeys = Object.keys(process.env);
//
//     console.log(`🚀  Server ready at ${url}`);
// });