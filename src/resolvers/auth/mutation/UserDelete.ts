import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const UserDelete = async (parent: any,
                            args: any,
                            context: any,
                            info: GraphQLResolveInfo) => {
    console.log('UserDelete: ', context.token, args);

    const found = await database('users')
        .select()
        .where({user_id: args.userDeleteRequest.user_id});
    if (found.length === 0) {
        throw new Error(`A user with the ID ${args.userDeleteRequest.user_id} does not exist`);
    }
    let season = found[0];

    await database('users')
        .where({user_id: args.userDeleteRequest.user_id})
        .del();

    return season;
};

export default UserDelete;