import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Users = async (parent: any,
                  args: any,
                  context: any,
                  info: GraphQLResolveInfo) => {
    const users = await database('users')
        .select()
        .where(args.usersGetRequest);

    return users;
};

export default Users;