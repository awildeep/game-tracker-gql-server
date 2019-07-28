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


    const weekId = await database.insert(
        args.weekCreateRequest,
        'week_id').into('weeks');

    const weeks = await database('weeks').select().where({'week_id': Number(weekId)});

    return weeks[0];

};

export default WeekCreate;