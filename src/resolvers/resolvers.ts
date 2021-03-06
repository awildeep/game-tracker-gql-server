import { combineResolvers } from 'graphql-resolvers';

import GuestCheck from './accessChecks/GuestCheck';
import ReadCheck from './accessChecks/ReadCheck';
import WriteCheck from './accessChecks/WriteCheck';

import Me from "./auth/query/Me";
import Users from "./auth/query/Users";
import SignIn from "./auth/mutation/SignIn";
import UserCreate from "./auth/mutation/UserCreate";
import UserEdit from "./auth/mutation/UserEdit";
import UserDelete from "./auth/mutation/UserDelete";

import Player from "./player/query/Player";
import Players from "./player/query/Players";
import PlayerCreate from "./player/mutation/PlayerCreate";
import PlayerEdit from "./player/mutation/PlayerEdit";
import PlayerDelete from "./player/mutation/PlayerDelete";

import Play from "./play/query/Play";
import PlaysByWeek from "./play/query/PlaysByWeek";
import PlayCreate from "./play/mutation/PlayCreate";
import PlayEdit from "./play/mutation/PlayEdit";
import PlayDelete from "./play/mutation/PlayDelete";

import Week from "./week/query/Week";
import WeeksBySeason from "./week/query/WeeksBySeason";
import WeekCreate from "./week/mutation/WeekCreate";
import WeekEdit from "./week/mutation/WeekEdit";
import WeekDelete from "./week/mutation/WeekDelete";

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

        Player: combineResolvers(ReadCheck, Player),
        Players: combineResolvers(ReadCheck, Players),

        Play: combineResolvers(ReadCheck, Play),
        PlaysByWeek: combineResolvers(ReadCheck, PlaysByWeek),

        Week: combineResolvers(ReadCheck, Week),
        WeeksBySeason: combineResolvers(ReadCheck, WeeksBySeason),

        Season: combineResolvers(ReadCheck, Season),
        Seasons: combineResolvers(ReadCheck, Seasons),
    },
    Mutation: {
        _,

        SignIn: combineResolvers(GuestCheck, SignIn),
        UserCreate: combineResolvers(WriteCheck, UserCreate),
        UserEdit: combineResolvers(WriteCheck, UserEdit),
        UserDelete: combineResolvers(WriteCheck, UserDelete),

        PlayerCreate: combineResolvers(WriteCheck, PlayerCreate),
        PlayerEdit: combineResolvers(WriteCheck, PlayerEdit),
        PlayerDelete: combineResolvers(WriteCheck, PlayerDelete),

        PlayCreate: combineResolvers(WriteCheck, PlayCreate),
        PlayEdit: combineResolvers(WriteCheck, PlayEdit),
        PlayDelete: combineResolvers(WriteCheck, PlayDelete),

        SeasonCreate: combineResolvers(WriteCheck, SeasonCreate),
        SeasonEdit: combineResolvers(WriteCheck, SeasonEdit),
        SeasonDelete: combineResolvers(WriteCheck, SeasonDelete),

        WeekEdit: combineResolvers(WriteCheck, WeekEdit),
        WeekCreate: combineResolvers(WriteCheck, WeekCreate),
        WeekDelete: combineResolvers(WriteCheck, WeekDelete),
    },
    Season: {
        weeks: combineResolvers(ReadCheck, WeeksBySeason),
    }
    ,
    Week: {
        plays: combineResolvers(ReadCheck, PlaysByWeek),
    },
    Play: {
        week: combineResolvers(ReadCheck, Week),
        player: combineResolvers(ReadCheck, Player),
    }
};

export default resolvers;