import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const SeasonDelete = async (parent: any,
                            args: any,
                            context: any,
                            info: GraphQLResolveInfo) => {
    console.log('SeasonDelete: ', context.token, args);

    const foundSeasons = await database('seasons')
        .select()
        .where({season_id: args.seasonDeleteRequest.season_id});
    if (foundSeasons.length === 0) {
        throw new Error(`A season with the ID ${args.seasonDeleteRequest.season_id} does not exist`);
    }
    let season = foundSeasons[0];

    await database('seasons')
        .where({season_id: args.seasonDeleteRequest.season_id})
        .del();

    return season;
};

export default SeasonDelete;