import { combineResolvers } from 'graphql-resolvers';

import GuestCheck from './accessChecks/GuestCheck';
import ReadCheck from './accessChecks/ReadCheck';
import WriteCheck from './accessChecks/WriteCheck';

import Me from "./auth/query/Me";
import Users from "./auth/query/Users";
import SignIn from "./auth/mutation/SignIn";

import PlayerGet from "./player/query/PlayerGet";
import PlayersGet from "./player/query/PlayersGet";
import PlayersGetByWeek from "./player/query/PlayersGetByWeek";
import PlayerCreate from "./player/mutation/PlayerCreate";
import PlayerEdit from "./player/mutation/PlayerEdit";
import PlayerDelete from "./player/mutation/PlayerDelete";

import PlayGet from "./play/query/PlayGet";
import PlaysGetByWeek from "./play/query/PlaysGetByWeek";
import PlayCreate from "./play/mutation/PlayCreate";
import PlayEdit from "./play/mutation/PlayEdit";
import PlayDelete from "./play/mutation/PlayDelete";

import WeekGet from "./week/query/WeekGet";
import WeeksGetBySeason from "./week/query/WeeksGetBySeason";

import SeasonGet from "./season/query/SeasonGet";
import SeasonsGet from "./season/query/SeasonsGet";
import SeasonCreate from "./season/mutation/SeasonCreate";
import SeasonDelete from "./season/mutation/SeasonDelete";
import SeasonEdit from "./season/mutation/SeasonEdit";


const _ = () => true;
const resolvers = {
    Query: {
        _,

        Me: combineResolvers(ReadCheck, Me),
        Users: combineResolvers(ReadCheck, Users),

        PlayerGet: combineResolvers(ReadCheck, PlayerGet),
        PlayersGet: combineResolvers(ReadCheck, PlayersGet),
        PlayersGetByWeek: combineResolvers(ReadCheck, PlayersGetByWeek),

        PlayGet: combineResolvers(ReadCheck, PlayGet),
        PlaysGetByWeek: combineResolvers(ReadCheck, PlaysGetByWeek),

        WeekGet: combineResolvers(ReadCheck, WeekGet),
        WeeksGetBySeason: combineResolvers(ReadCheck, WeeksGetBySeason),

        SeasonGet: combineResolvers(ReadCheck, SeasonGet),
        SeasonsGet: combineResolvers(ReadCheck, SeasonsGet),
    },
    Mutation: {
        _,

        SignIn: combineResolvers(GuestCheck, SignIn),

        PlayerCreate: combineResolvers(WriteCheck, PlayerCreate),
        PlayerEdit: combineResolvers(WriteCheck, PlayerEdit),
        PlayerDelete: combineResolvers(WriteCheck, PlayerDelete),

        PlayCreate: combineResolvers(WriteCheck, PlayCreate),
        PlayEdit: combineResolvers(WriteCheck, PlayEdit),
        PlayDelete: combineResolvers(WriteCheck, PlayDelete),

        SeasonCreate: combineResolvers(WriteCheck, SeasonCreate),
        SeasonEdit: combineResolvers(WriteCheck, SeasonEdit),
        SeasonDelete: combineResolvers(WriteCheck, SeasonDelete),
    }
};

export default resolvers;