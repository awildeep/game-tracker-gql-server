import {GraphQLResolveInfo} from "graphql";

const WeeksBySeason = (parent: any,
                                args: any,
                                context: any,
                                info: GraphQLResolveInfo) => {
    console.log('WeeksBySeason called: ', context.token, args);

    const seasonId = (args.weeksBySeasonRequest) ? args.weeksBySeasonRequest.season_id : parent.season_id;

    return context.dataloaders.weeksBySeasonIds.load([seasonId]);
};

export default WeeksBySeason;