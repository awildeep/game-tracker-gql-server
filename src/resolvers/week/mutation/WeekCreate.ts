import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const WeekCreate = async (parent: any,
                            args: any,
                            context: any,
                            info: GraphQLResolveInfo) => {
    console.log('WeekCreate: ', context.token, args);

    const previousWeeks = await database('weeks').select().where(args.weekCreateRequest);
    if (previousWeeks.length > 0) {
        throw new Error(`A week with the date_played ${args.weekCreateRequest.date_played} already exists`);
    }


    const seasonId = await database.insert(
        args.seasonCreateRequest,
        'season_id').into('seasons');

    const seasons = await database('seasons').select().where({'season_id': Number(seasonId)});

    let season = seasons[0];

    const weeks = await database('weeks')
        .select()
        .where({
            'season_id': Number(seasonId)
        });
    if (weeks.length !== 0) {
        season.weeks = weeks;
    } else {
        season.weeks = [];
    }


    return season;

};

export default WeekCreate;