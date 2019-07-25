import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const SeasonGet = async (parent: any,
                         args: any,
                         context: any,
                         info: GraphQLResolveInfo) => {
    console.log('SeasonGet: ', context.token);

    const seasons = await database('seasons').select().where(args.seasonGetRequest);
    let season = seasons[0];

    const weeks = await database('weeks')
        .select()
        .where({
            'season_id': args.seasonGetRequest.season_id
        });
    if (weeks.length !== 0) {
        season.weeks = weeks;
    } else {
        season.weeks = [];
    }


    return season;


};

export default SeasonGet;