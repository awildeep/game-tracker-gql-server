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

    let play = plays[0];

    const weeks = await database('weeks')
        .select()
        .where({
            'week_id': play.week_id
        });
    if (weeks.length === 1) {
        play.week = weeks[0];
    } else {
        throw new Error('Play Too many weeks '+ weeks.length);
    }

    const players = await database('players')
        .select()
        .where({
            'player_id': play.player_id
        });
    if (players.length === 1) {
        play.player = players[0];
    } else {
        throw new Error('Play Too many players ' + players.length);
    }

    return play;
};

export default PlayEdit;