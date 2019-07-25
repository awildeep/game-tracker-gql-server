import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const PlayersGet = async (parent: any,
                         args: any,
                         context: any,
                         info: GraphQLResolveInfo) => {
    console.log('PlaysGet: ', context.token, args);

    const players = await database('players').select().where(
        args.playersGetRequest
    );
    return players


};

export default PlayersGet;