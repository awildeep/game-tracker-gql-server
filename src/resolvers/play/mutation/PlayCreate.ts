import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayCreate = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('PlayCreate: ', context.token, args);

    const previousPlayers = await database('plays').select().where(
        {
            week_id: args.playCreateRequest.week_id,
            player_id: args.playCreateRequest.player_id,
        }
        );
    if (previousPlayers.length > 0) {
        throw new Error(`A play for this player and week already exists`);
    }

    const playId = await database.insert(
        {
            week_id: args.playCreateRequest.week_id,
            rank: args.playCreateRequest.rank,
            player_id: args.playCreateRequest.player_id,
        },
        'play_id').into('plays');


    const plays = await database('plays').select().where({
        play_id: Number(playId),
    });

    return plays[0];

};

export default PlayCreate;