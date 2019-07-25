import { ForbiddenError } from 'apollo-server';
import {GraphQLResolveInfo} from "graphql";

const WriteCheck = async (parent: any,
                         args: any,
                         context: any,
                         info: GraphQLResolveInfo) => {
    console.log('WriteCheck: ', context.token, args);
    if (!context.me.admin) {
        throw new ForbiddenError('Access denied.');
    }
};


export default WriteCheck;
