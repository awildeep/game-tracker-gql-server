import {GraphQLResolveInfo} from "graphql";

const Season = async (parent: any,
                      args: any,
                      context: any,
                      info: GraphQLResolveInfo) => {
    console.log('Season: ', args);

    return context.dataloaders.seasonsByIds.load([args.seasonRequest.season_id]);
};

export default Season;