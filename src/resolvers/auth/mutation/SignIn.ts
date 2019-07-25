import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';
import bcrypt from 'bcrypt';
import createToken from "../createToken";

const invalidMessage = 'Invalid user or password';

const SignIn = async (parent: any,
                      args: any,
                      context: any,
                      info: GraphQLResolveInfo) => {
    console.log('SignIn: ', context.token, args);

    const users = await database('users').select().where(
        {
            username: args.signInRequest.username,
        }
    );

    if (users.length !== 1) {
        throw new Error(invalidMessage);
    }
    const user = users[0];

    if(bcrypt.compare(args.signInRequest.password, user.password)) {
        return { token: createToken(users[0], context.jwt_secret, '30m') };
    } else {
        throw new Error(invalidMessage);
    }



};

export default SignIn;