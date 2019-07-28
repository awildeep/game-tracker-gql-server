import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Season = async (parent: any,
                      args: any,
                      context: any,
                      info: GraphQLResolveInfo) => {
    console.log('Season: ', args);

    const seasons = await database('seasons').select().where(args.seasonRequest);
    let season = seasons[0];
    console.log(season);
    const weeks = await database('weeks')
        .select()
        .where({
            'season_id': args.seasonRequest.season_id
        });
    console.log(weeks);
    if (weeks.length !== 0) {
        season.weeks = weeks;
    } else {
        season.weeks = [];
    }


    return season;


};

export default Season;