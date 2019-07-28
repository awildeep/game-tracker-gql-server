import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Week = async (parent: any,
                    args: any,
                    context: any,
                    info: GraphQLResolveInfo) => {
    console.log('Week: ', context.token);

    const weeks = await database('weeks').select().where(args.weekRequest);
    let week = weeks[0];

    const plays = await database('plays')
        .select()
        .where({
            'week_id': args.weekRequest.week_id
        });
    if (plays.length !== 0) {
        week.plays = plays;
    } else {
        week.plays = [];
    }


    return week;


};

export default Week;