import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';
import bcrypt from 'bcrypt';
import createToken from "../createToken";

const SignUp = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('SignUp: ', context.token, args);

    const previousUsers = await database('users').select().where(
        {
            username: args.signUpeRequest.username,
        }
    );
    if (previousUsers.length > 0) {
        throw new Error(`A user for this username already exists`);
    }

    const userId = await database.insert(
        {
            username: args.signUpeRequest.username,
            name: args.playCreateRequest.name,
            admin: false,
            password: bcrypt.hash(args.playCreateRequest.password, 10),
        },
        'user_id').into('users');


    const users = await database('users').select().where({
        user_id: Number(userId),
    });

    return { token: createToken(users[0], context.jwt_secret, '30m') };

};

export default SignUp;