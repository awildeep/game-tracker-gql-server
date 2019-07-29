import {GraphQLResolveInfo} from "graphql";

const Week = (parent: any,
                    args: any,
                    context: any,
                    info: GraphQLResolveInfo) => {
    console.log('Week: ', parent, args, context);

    const weekId = (args.weekRequest) ? args.weekRequest.week_id : parent.week_id;

    return context.dataloaders.weeksByIds.load([weekId]);
};

export default Week;