import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayEdit = async (parent: any,
                        args: any,
                        context: any,
                        info: GraphQLResolveInfo) => {
    console.log('PlayEdit: ', context.token, args);

    const foundPlays = await database('plays')
        .select()
        .where({
            play_id: args.playEditRequest.play_id,
        });
    if (foundPlays.length === 0) {
        throw new Error(`A play with the ID ${args.playEditRequest.play_id} does not exist`);
    }


    await database('plays')
        .where({play_id: args.playEditRequest.play_id})
        .update({
            player_id: args.playEditRequest.player_id,
            rank: args.playEditRequest.rank,
        });

    const plays = await database('plays')
        .select()
        .where({'play_id': Number(args.playEditRequest.play_id)});

    return plays[0];
};

export default PlayEdit;