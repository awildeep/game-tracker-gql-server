import {GraphQLResolveInfo} from "graphql";

const Seasons = async (parent: any,
                       args: any,
                       context: any,
                       info: GraphQLResolveInfo) => {
    console.log('Seasons: ', context.token);

    return context.datafetchers.seasonsGet(args.seasonsRequest);
};

export default Seasons;