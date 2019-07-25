import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const WeekGet = async (parent: any,
                         args: any,
                         context: any,
                         info: GraphQLResolveInfo) => {
    console.log('WeekGet: ', context.token);

    const weeks = await database('weeks').select().where(args.weekGetRequest);
    let week = weeks[0];

    const plays = await database('plays')
        .select()
        .where({
            'week_id': args.weekGetRequest.week_id
        });
    if (plays.length !== 0) {
        week.plays = plays;
    } else {
        week.plays = [];
    }


    return week;


};

export default WeekGet;