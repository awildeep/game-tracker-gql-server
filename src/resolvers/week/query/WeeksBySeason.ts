import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const WeeksBySeason = async (parent: any,
                                args: any,
                                context: any,
                                info: GraphQLResolveInfo) => {
    console.log('WeeksBySeason called: ', context.token, args);

    console.log('parent', parent);

    const seasonId = (args.weeksGetBySeasonRequest) ? args.weeksBySeasonRequest.season_id : parent.season_id;


    let weeks = await database('weeks')
        .where({
        'weeks.season_id': seasonId
    });

    // for (let index = 0; index < weeks.length; index++) {
    //     let newWeek = weeks[index];
    //     const plays = await database('plays')
    //         .select()
    //         .where({
    //             'week_id': newWeek.week_id
    //         });
    //     if (plays.length > 0) {
    //         newWeek.plays = plays;
    //     }
    //
    //     weeks[index] = newWeek;
    // }

    return weeks;

};

export default WeeksBySeason;