import {GraphQLResolveInfo} from "graphql";

const SeasonCreate = async (parent: any,
                            args: any,
                            context: any,
                            info: GraphQLResolveInfo) => {
    console.log('SeasonCreate: ', context.token, args);

    const previousSeasons = context.datafetchers.seasonsGetByName(args.seasonCreateRequest.name);
    if (previousSeasons.length > 0) {
        throw new Error(`A season with the name ${args.seasonCreateRequest.name} already exists`);
    }

    const seasonId = await context.datafetchers.seasonCreate(args.seasonCreateRequest);


    return context.dataloaders.seasonsByIds.load([seasonId]);
};

export default SeasonCreate;