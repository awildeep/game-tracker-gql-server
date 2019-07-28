import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayDelete = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('PlayDelete: ', context.token, args);

    const foundPlays = await database('plays')
        .select()
        .where({play_id: args.playDeleteRequest.play_id});
    if (foundPlays.length === 0) {
        throw new Error(`A play with the ID ${args.playDeleteRequest.play_id} does not exist`);
    }

    let foundPlay = foundPlays[0];

    await database('plays')
        .where({play_id: args.playDeleteRequest.play_id})
        .del();

    const weeks = await database('weeks')
        .select()
        .where({
            'week_id': foundPlay.week_id
        });
    if (weeks.length === 1) {
        foundPlay.week = weeks[0];
    } else {
        throw new Error('Play Too many weeks '+ weeks.length);
    }

    const players = await database('players')
        .select()
        .where({
            'player_id': foundPlay.player_id
        });
    if (players.length === 1) {
        foundPlay.player = players[0];
    } else {
        throw new Error('Play Too many players ' + players.length);
    }



    return foundPlay;
};

export default PlayDelete;