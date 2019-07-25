import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const SeasonCreate = async (parent: any,
                            args: any,
                            context: any,
                            info: GraphQLResolveInfo) => {
    console.log('SeasonCreate: ', context.token, args);

    const previousSeasons = await database('seasons').select().where(args.seasonCreateRequest);
    if (previousSeasons.length > 0) {
        throw new Error(`A season with the name ${args.seasonCreateRequest.name} already exists`);
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

export default SeasonCreate;