import database from "../database";

const seasonGetByName = (name) => {
    return database('seasons').select()
        .where({'name': name});
};

export default seasonGetByName;