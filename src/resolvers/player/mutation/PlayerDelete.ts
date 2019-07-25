import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayerDelete = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('PlayDelete: ', context.token, args);

    const foundPlayers = await database('players')
        .select()
        .where({player_id: args.playerDeleteRequest.player_id});
    if (foundPlayers.length === 0) {
        throw new Error(`A player with the ID ${args.playerDeleteRequest.player_id} does not exist`);
    }

    await database('players')
        .where({player_id: args.playerDeleteRequest.player_id})
        .del();


    return foundPlayers[0];
};

export default PlayerDelete;