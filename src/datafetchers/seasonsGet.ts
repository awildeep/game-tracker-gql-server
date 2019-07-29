import database from "../database";

const seasonsGet = (params) => {
    return database('seasons').select()
        .where(params);
};

export default seasonsGet;