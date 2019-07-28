import { ForbiddenError } from 'apollo-server';
import {GraphQLResolveInfo} from "graphql";

const ReadCheck = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('ReadCheck');
    if (!context.me.can_login) {
        throw new ForbiddenError('Access denied.');
    }
};


export default ReadCheck;
