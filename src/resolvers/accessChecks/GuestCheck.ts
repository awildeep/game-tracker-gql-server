import { ForbiddenError } from 'apollo-server';
import {GraphQLResolveInfo} from "graphql";

const GuestCheck = async (parent: any,
                      args: any,
                      context: any,
                      info: GraphQLResolveInfo) => {
    console.log('GuestCheck');
    if (context.me.user_id !== 0) {
        throw new ForbiddenError('Access already granted, access to this method is not needed.');
    }
};
export default GuestCheck;
