import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const WeekDelete = async (parent: any,
                            args: any,
                            context: any,
                            info: GraphQLResolveInfo) => {
    console.log('WeekDelete: ', context.token, args);

    const found = await database('weeks')
        .select()
        .where({week_id: args.weekDeleteRequest.week_id});
    if (found.length === 0) {
        throw new Error(`A week with the ID ${args.weekDeleteRequest.week_id} does not exist`);
    }
    let week = found[0];


    await database('weeks')
        .where({week_id: args.weekDeleteRequest.week_id})
        .del();

    return week;
};

export default WeekDelete;