import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const SeasonsGet = async (parent: any,
                         args: any,
                         context: any,
                         info: GraphQLResolveInfo) => {
    console.log('SeasonsGet: ', context.token);

    const seasons = await database('seasons').select().where(args.seasonsGetRequest);
    console.log(seasons);


    for (let index = 0; index < seasons.length; index++) {
        let newSeason = seasons[index];
        newSeason.weeks = await database('weeks')
            .select()
            .where({
                'season_id': newSeason.season_id
            });

        seasons[index] = newSeason;
    }

    return seasons;
};

export default SeasonsGet;