import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const SeasonEdit = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('SeasonEdit: ', context.token, args);

    const foundSeasons = await database('seasons')
        .select()
        .where({season_id: args.seasonEditRequest.season_id});
    if (foundSeasons.length === 0) {
        throw new Error(`A season with the ID ${args.seasonEditRequest.season_id} does not exist`);
    }

    const previousSeasons = await database('seasons')
        .select()
        .where({name: args.seasonEditRequest.name});
    if (previousSeasons.length > 0) {
        throw new Error(`A season with the name ${args.seasonEditRequest.name} already exists`);
    }


    await database('seasons')
        .where({season_id: args.seasonEditRequest.season_id})
        .update({
            name: args.seasonEditRequest.name,
        });

    const seasons = await database('seasons')
        .select()
        .where({'season_id': Number(args.seasonEditRequest.season_id)});

    let season = seasons[0];

    const weeks = await database('weeks')
        .select()
        .where({
            'season_id': args.seasonEditRequest.season_id
        });
    if (weeks.length !== 0) {
        season.weeks = weeks;
    } else {
        season.weeks = [];
    }


    return season;

};

export default SeasonEdit;