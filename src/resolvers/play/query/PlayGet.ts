import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayGet = async (parent: any,
                       args: any,
                       context: any,
                       info: GraphQLResolveInfo) => {
    const plays = await database('plays')
        .select()
        .where(args.playGetRequest);
    let play = plays[0];

    const weeks = await database('weeks')
        .select()
        .where({
            'week_id': play.week_id
        });
    if (weeks.length === 1) {
        play.week = weeks[0];
    } else {
        throw new Error('PlayGet Too many weeks '+ weeks.length);
    }

    const players = await database('players')
        .select()
        .where({
            'player_id': play.player_id
        });
    if (players.length === 1) {
        play.player = players[0];
    } else {
        throw new Error('PlayGet Too many players ' + players.length);
    }

    return play;
};

export default PlayGet;