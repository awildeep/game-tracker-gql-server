import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';
const bcrypt = require('bcrypt');

const UserEdit = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('UserEdit: ', context.token, args);

    const found = await database('users')
        .select()
        .where({user_id: args.userEditRequest.user_id});

    console.log(found);
    if (found.length === 0) {
        throw new Error(`A user with the ID ${args.userEditRequest.user_id} does not exist`);
    }

    const previous = await database('users')
        .select()
        .where({username: args.userEditRequest.username});
    if (previous.length > 0) {
        throw new Error(`A user with the username ${args.userEditRequest.username} already exists`);
    }

    await database('users')
        .where({user_id: args.userEditRequest.user_id})
        .update({
            name: args.userEditRequest.name,
            username: args.userEditRequest.username,
            password: await bcrypt.hash(args.userEditRequest.password, 10),
            admin: args.userEditRequest.admin,
            can_login: args.userEditRequest.can_login,
        });

    const users = await database('users')
        .select()
        .where({'user_id': Number(args.userEditRequest.user_id)});

    console.log(users);
    return users[0];

};

export default UserEdit;