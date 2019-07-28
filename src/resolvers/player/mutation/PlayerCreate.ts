import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayerCreate = async (parent: any,
                         args: any,
                         context: any,
                         info: GraphQLResolveInfo) => {
    console.log('PlayCreate: ', context.token, args);

    const previousPlayers = await database('players').select().where(args.playerCreateRequest);
    if (previousPlayers.length > 0) {
        throw new Error(`A player with the name ${args.playerCreateRequest.name} already exists`);
    }

    const playerId = await database.insert(
        {
            name: args.playerCreateRequest.name,
            active: true
        },
        'player_id').into('players');


    const players = await database('players').select().where({'player_id': Number(playerId)});

    return players[0];

};

export default PlayerCreate;