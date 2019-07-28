import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlaysByWeek = async (parent: any,
                              args: any,
                              context: any,
                              info: GraphQLResolveInfo) => {
    console.log('PlaysByWeek called: ', context.token, args);

    const weekId = (args.playsByWeekRequest) ? args.playsByWeekRequest.week_id : parent.week_id;

    let plays = await database('plays')
        .select()
        .where({
            'plays.week_id': weekId
        });

    // for (let index = 0; index < plays.length; index++) {
    //     let newPlay = plays[index];
    //     const weeks = await database('weeks')
    //         .select()
    //         .where({
    //             'week_id': newPlay.week_id
    //         });
    //     if (weeks.length === 1) {
    //         newPlay.week = weeks[0];
    //     } else {
    //         throw new Error('Play Too many weeks '+ weeks.length);
    //     }
    //
    //     const players = await database('players')
    //         .select()
    //         .where({
    //             'player_id': newPlay.player_id
    //         });
    //     if (players.length === 1) {
    //         newPlay.player = players[0];
    //     } else {
    //         throw new Error('Play Too many players ' + players.length);
    //     }
    //
    //     plays[index] = newPlay;
    // }
    return plays;
};

export default PlaysByWeek;