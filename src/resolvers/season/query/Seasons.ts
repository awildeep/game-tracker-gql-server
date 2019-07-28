import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Seasons = async (parent: any,
                       args: any,
                       context: any,
                       info: GraphQLResolveInfo) => {
    console.log('Seasons: ', context.token);

    const seasons = await database('seasons').select().where(args.seasonsRequest);


    return seasons;
};

export default Seasons;