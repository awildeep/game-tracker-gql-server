import {GraphQLResolveInfo} from "graphql";
import database from '../../../database';

const Players = async (parent: any,
                       args: any,
                       context: any,
                       info: GraphQLResolveInfo) => {
    console.log('Players: ', context.token, args);

    const players = await database('players').select().where(
        args.playersRequest
    );
    return players


};

export default Players;