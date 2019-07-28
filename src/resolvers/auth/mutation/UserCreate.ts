import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';
const bcrypt = require('bcrypt');

const UserCreate = async (parent: any,
                            args: any,
                            context: any,
                            info: GraphQLResolveInfo) => {
    console.log('UserCreate: ', context.token, args);

    const previous = await database('users').select().where(args.userCreateRequest);
    if (previous.length > 0) {
        throw new Error(`A user with the username ${args.userCreateRequest.username} already exists`);
    }


    const id = await database.insert(
        {
            name: args.userCreateRequest.name,
            username: args.userCreateRequest.username,
            password: await bcrypt.hash(args.userCreateRequest.password, 10),
            admin: args.userCreateRequest.admin,
            can_login: args.userCreateRequest.can_login,
        },
        'user_id').into('users');

    const users = await database('users').select().where({'user_id': Number(id)});

    return users[0];
};

export default UserCreate;