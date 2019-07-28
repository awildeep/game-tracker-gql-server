import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Week = async (parent: any,
                    args: any,
                    context: any,
                    info: GraphQLResolveInfo) => {
    console.log('Week: ', parent, args, context);

    const weekId = (args.weekRequest) ? args.weekRequest.week_id : parent.week_id;

    const weeks = await database('weeks').select().where(
        {week_id: weekId}
    );

    return weeks[0];

};

export default Week;