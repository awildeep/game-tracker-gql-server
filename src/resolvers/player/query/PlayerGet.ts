import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayerGet = async (parent: any,
                     args: any,
                     context: any,
                     info: GraphQLResolveInfo) => {
    console.log('PlayerGet: ', context.token);

    const players = await database('players').select().where(args.playerGetRequest);
    return players[0]


};

export default PlayerGet;