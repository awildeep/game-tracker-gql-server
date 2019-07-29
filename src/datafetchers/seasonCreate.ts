import database from "../database";

const seasonCreate = (seasonData) => {
    return database.insert(
        seasonData,
        'season_id').into('seasons');
};

export default seasonCreate;