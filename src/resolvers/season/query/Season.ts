import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Season = async (parent: any,
                      args: any,
                      context: any,
                      info: GraphQLResolveInfo) => {
    console.log('Season: ', args);

    const seasons = await database('seasons').select().where(args.seasonRequest);
    return seasons[0];
};

export default Season;