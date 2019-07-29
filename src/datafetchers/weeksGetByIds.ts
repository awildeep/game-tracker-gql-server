import database from "../database";

const weeksGetByIds = (weekIds) => {
    return database('weeks').select()
        .whereIn('week_id', weekIds.map(Number));
};

export default weeksGetByIds;