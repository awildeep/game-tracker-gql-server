import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlaysByWeek = async (parent: any,
                              args: any,
                              context: any,
                              info: GraphQLResolveInfo) => {
    console.log('PlaysByWeek called: ', context.token, args);

    const weekId = (args.playsByWeekRequest) ? args.playsByWeekRequest.week_id : parent.week_id;

    return await database('plays')
        .select()
        .where({
            'plays.week_id': weekId
        });
};

export default PlaysByWeek;