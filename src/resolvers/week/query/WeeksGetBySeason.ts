import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const WeeksGetBySeason = async (parent: any,
                                args: any,
                                context: any,
                                info: GraphQLResolveInfo) => {
    console.log('WeeksGetBySeason called: ', context.token, args);

    let weeks = await database('weeks').
    where({
        'weeks.season_id': args.weeksGetBySeasonRequest.season_id
    });

    for (let index = 0; index < weeks.length; index++) {
        let newWeek = weeks[index];
        const plays = await database('plays')
            .select()
            .where({
                'week_id': newWeek.week_id
            });
        if (plays.length > 0) {
            newWeek.plays = plays;
        }

        weeks[index] = newWeek;
    }

    return weeks;

};

export default WeeksGetBySeason;