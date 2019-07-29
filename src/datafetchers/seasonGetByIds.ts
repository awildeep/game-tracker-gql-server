import database from "../database";

const seasonGetByIds = (seasonIds) => {
    return database('seasons').select()
        .whereIn('season_id', seasonIds.map(Number));
};

export default seasonGetByIds;