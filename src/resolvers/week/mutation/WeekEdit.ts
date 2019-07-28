import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const WeekEdit = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('WeekEdit: ', context.token, args);

    const previousWeeks = await database('weeks').select().where(args.weekEditRequest);
    if (previousWeeks.length > 0) {
        throw new Error(`A week with the date_played ${args.weekEditRequest.date_played} already exists`);
    }



    await database('weeks')
        .where({week_id: args.weekEditRequest.week_id})
        .update({
            date_played: args.weekEditRequest.date_played,
        });


    const weeks = await database('weeks').select().where({'week_id': Number(args.weekEditRequest.week_id)});

    return weeks[0];

};

export default WeekEdit;