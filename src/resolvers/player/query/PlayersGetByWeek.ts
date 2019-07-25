import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayersGetByWeek = async (parent: any,
                          args: any,
                          context: any,
                          info: GraphQLResolveInfo) => {
    console.log('PlaysGetByWeek called: ', context.token, args);

    const players = await database('players').
        join('plays', 'plays.player_id', '=', 'players.player_id').
        join('weeks', 'weeks.week_id', '=', 'plays.week_id').
        where({
            'weeks.week_id': args.playerGetByWeekRequest.week_id
        });
    return players;

};

export default PlayersGetByWeek;