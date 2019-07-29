import seasonGetByIds from "../datafetchers/seasonGetByIds";

const seasonsByIds   = async (seasonIds) => {
    return seasonGetByIds(seasonIds);
};

export default seasonsByIds
