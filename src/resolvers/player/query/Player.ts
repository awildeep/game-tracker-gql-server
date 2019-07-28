import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Player = async (parent: any,
                      args: any,
                      context: any,
                      info: GraphQLResolveInfo) => {
    console.log('Player: ', parent, args, context);

    const playerId = (args.playerRequest) ? args.playerRequest.player_id : parent.player_id;

    const players = await database('players').select().where(
        {player_id: playerId}
    );
    return players[0]


};

export default Player;