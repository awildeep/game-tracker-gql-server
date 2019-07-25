import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayerEdit = async (parent: any,
                            args: any,
                            context: any,
                            info: GraphQLResolveInfo) => {
    console.log('PlayEdit: ', context.token, args);

    const foundPlayers = await database('players')
        .select()
        .where({player_id: args.playerEditRequest.player_id});
    if (foundPlayers.length === 0) {
        throw new Error(`A player with the ID ${args.playerEditRequest.player_id} does not exist`);
    }

    const previousPlayers = await database('players')
        .select()
        .where({name: args.playerEditRequest.name});
    if (previousPlayers.length > 0) {
        throw new Error(`A player with the name ${args.playerEditRequest.name} already exists`);
    }


    await database('players')
        .where({player_id: args.playerEditRequest.player_id})
        .update({
            name: args.playerEditRequest.name,
            active: args.playerEditRequest.active,
        });

    const players = await database('players')
        .select()
        .where({'player_id': Number(args.playerEditRequest.player_id)});

    return players[0];

};

export default PlayerEdit;