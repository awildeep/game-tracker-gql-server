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

import Week from "./week/query/Week";
import WeeksBySeason from "./week/query/WeeksBySeason";

import Season from "./season/query/Season";
import Seasons from "./season/query/Seasons";
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

        Week: combineResolvers(ReadCheck, Week),
        WeeksBySeason: combineResolvers(ReadCheck, WeeksBySeason),

        Season: combineResolvers(ReadCheck, Season),
        Seasons: combineResolvers(ReadCheck, Seasons),
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
    },
    Season: {
        weeks: combineResolvers(ReadCheck, WeeksBySeason),
    }
    ,
    Week: {
        plays: combineResolvers(ReadCheck, PlaysGetByWeek),
    }
};

export default resolvers;