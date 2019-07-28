import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Seasons = async (parent: any,
                       args: any,
                       context: any,
                       info: GraphQLResolveInfo) => {
    console.log('Seasons: ', context.token);

    return await database('seasons').select().where(args.seasonsRequest);
};

export default Seasons;