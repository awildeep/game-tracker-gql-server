import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

export const getMe = async (authenticated_user_id: string) => {
    const users = await database('users')
        .select()
        .where({user_id: authenticated_user_id});

    return users[0];
};

const Me = async (parent: any,
                       args: any,
                       context: any,
                       info: GraphQLResolveInfo) => {
    console.log('Me called, ', context.authenticated_user_id);

    return context.me;
};

export default Me;