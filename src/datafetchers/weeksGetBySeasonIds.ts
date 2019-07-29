import database from "../database";

export const weeksGetBySeasonIds = (seasonIds) => {
    return database('weeks').select()
        .whereIn('season_id', seasonIds.map(Number));
};

export default weeksGetBySeasonIds;