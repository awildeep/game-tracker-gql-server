import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const WeeksBySeason = async (parent: any,
                                args: any,
                                context: any,
                                info: GraphQLResolveInfo) => {
    console.log('WeeksBySeason called: ', context.token, args);

    const seasonId = (args.weeksBySeasonRequest) ? args.weeksBySeasonRequest.season_id : parent.season_id;

    let weeks = await database('weeks')
        .where({
        'weeks.season_id': seasonId
    });

    return weeks;

};

export default WeeksBySeason;