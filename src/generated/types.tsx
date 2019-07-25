export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AuthLoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  _?: Maybe<Scalars["Boolean"]>;
  PlayerCreate?: Maybe<Player>;
  PlayerEdit?: Maybe<Player>;
  PlayerDelete?: Maybe<Player>;
  PlayCreate?: Maybe<Play>;
  PlayEdit?: Maybe<Play>;
  PlayDelete?: Maybe<Play>;
  WeekCreate?: Maybe<Week>;
  WeekEdit?: Maybe<Week>;
  WeekDelete?: Maybe<Week>;
  SeasonCreate?: Maybe<Season>;
  SeasonEdit?: Maybe<Season>;
  SeasonDelete?: Maybe<Season>;
};

export type MutationPlayerCreateArgs = {
  playerCreateRequest: PlayerCreateInput;
};

export type MutationPlayerEditArgs = {
  playerEditRequest: PlayerEditInput;
};

export type MutationPlayerDeleteArgs = {
  playerDeleteRequest: PlayerDeleteInput;
};

export type MutationPlayCreateArgs = {
  playCreateRequest: PlayCreateInput;
};

export type MutationPlayEditArgs = {
  playEditRequest: PlayEditInput;
};

export type MutationPlayDeleteArgs = {
  playDeleteRequest: PlayDeleteInput;
};

export type MutationWeekCreateArgs = {
  weekCreateRequest: WeekCreateInput;
};

export type MutationWeekEditArgs = {
  weekEditRequest: WeekEditInput;
};

export type MutationWeekDeleteArgs = {
  weekDeleteRequest: WeekDeleteInput;
};

export type MutationSeasonCreateArgs = {
  seasonCreateRequest: SeasonCreateInput;
};

export type MutationSeasonEditArgs = {
  seasonEditRequest: SeasonEditInput;
};

export type MutationSeasonDeleteArgs = {
  seasonDeleteRequest: SeasonDeleteInput;
};

export type Play = {
  __typename?: "Play";
  play_id?: Maybe<Scalars["ID"]>;
  week: Week;
  player: Player;
  rank: Scalars["Int"];
};

export type PlayCreateInput = {
  week_id: Scalars["ID"];
  player_id: Scalars["ID"];
  rank: Scalars["Int"];
};

export type PlayDeleteInput = {
  week_id: Scalars["ID"];
  player_id: Scalars["ID"];
};

export type PlayEditInput = {
  week_id: Scalars["ID"];
  player_id: Scalars["ID"];
  rank: Scalars["Int"];
};

export type Player = {
  __typename?: "Player";
  player_id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  active?: Maybe<Scalars["Boolean"]>;
};

export type PlayerCreateInput = {
  name: Scalars["String"];
};

export type PlayerDeleteInput = {
  player_id: Scalars["ID"];
};

export type PlayerEditInput = {
  player_id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
};

export type PlayerGetByWeekInput = {
  week_id?: Maybe<Scalars["ID"]>;
};

export type PlayerGetInput = {
  player_id?: Maybe<Scalars["ID"]>;
};

export type PlayersGetInput = {
  active?: Maybe<Scalars["Boolean"]>;
};

export type PlayGetInput = {
  play_id: Scalars["ID"];
};

export type PlaysGetByWeekInput = {
  week_id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  _?: Maybe<Scalars["Boolean"]>;
  AuthLogin: User;
  PlayersGet: Array<Maybe<Player>>;
  PlayerGet?: Maybe<Player>;
  PlayersGetByWeek: Array<Maybe<Player>>;
  PlayGet?: Maybe<Play>;
  PlaysGetBySeason: Array<Maybe<Play>>;
  WeekGet?: Maybe<Week>;
  WeeksGetBySeason: Array<Maybe<Week>>;
  SeasonGet?: Maybe<Season>;
  ReportGetStandings: Array<Maybe<Standing>>;
};

export type QueryAuthLoginArgs = {
  authLoginRequest: AuthLoginInput;
};

export type QueryPlayersGetArgs = {
  playersGetRequest: PlayersGetInput;
};

export type QueryPlayerGetArgs = {
  playerGetRequest: PlayerGetInput;
};

export type QueryPlayersGetByWeekArgs = {
  playerGetByWeekRequest: PlayerGetByWeekInput;
};

export type QueryPlayGetArgs = {
  playGetRequest: PlayGetInput;
};

export type QueryPlaysGetBySeasonArgs = {
  playsGetByWeekRequest: PlaysGetByWeekInput;
};

export type QueryWeekGetArgs = {
  weekGetRequest: WeekGetInput;
};

export type QueryWeeksGetBySeasonArgs = {
  weeksBySeasonRequest: WeeksGetBySeasonInput;
};

export type QuerySeasonGetArgs = {
  seasonGetRequest: SeasonGetInput;
};

export type QueryReportGetStandingsArgs = {
  reportGetStandingsRequest: ReportGetStandingsInput;
};

export type ReportGetStandingsInput = {
  season_id: Scalars["ID"];
};

export type Season = {
  __typename?: "Season";
  season_id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  weeks: Array<Week>;
};

export type SeasonCreateInput = {
  season_id: Scalars["ID"];
  name: Scalars["String"];
};

export type SeasonDeleteInput = {
  season_id: Scalars["ID"];
};

export type SeasonEditInput = {
  season_id: Scalars["ID"];
  name: Scalars["String"];
};

export type SeasonGetInput = {
  season_id: Scalars["ID"];
};

export type Standing = {
  __typename?: "Standing";
  player: Player;
  numberOfPlays: Scalars["Int"];
  averageRank: Scalars["Float"];
  points: Scalars["Float"];
};

export type Subscription = {
  __typename?: "Subscription";
  _?: Maybe<Scalars["Boolean"]>;
};

export type User = {
  __typename?: "User";
  user_id?: Maybe<Scalars["ID"]>;
  username?: Maybe<Scalars["String"]>;
  roles?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Week = {
  __typename?: "Week";
  week_id?: Maybe<Scalars["ID"]>;
  date?: Maybe<Scalars["Date"]>;
  plays: Array<Play>;
};

export type WeekCreateInput = {
  week_id: Scalars["ID"];
  date?: Maybe<Scalars["Date"]>;
};

export type WeekDeleteInput = {
  week_id: Scalars["ID"];
};

export type WeekEditInput = {
  week_id: Scalars["ID"];
  date?: Maybe<Scalars["Date"]>;
};

export type WeekGetInput = {
  week_id: Scalars["ID"];
};

export type WeeksGetBySeasonInput = {
  season_id: Scalars["ID"];
};
