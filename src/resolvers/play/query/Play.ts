import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Play = async (parent: any,
                    args: any,
                    context: any,
                    info: GraphQLResolveInfo) => {
    console.log('play: ', parent, args, context);

    const playId = (args.playRequest) ? args.playRequest.play_id : parent.play_id;
    const plays = await database('plays')
        .select()
        .where({
            play_id: playId
        });

    return plays[0];
};

export default Play;