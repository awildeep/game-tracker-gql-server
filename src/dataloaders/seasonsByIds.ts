import seasonGetByIds from "../datafetchers/seasonGetByIds";

const seasonsByIds  = (seasonIds) => {
    return seasonGetByIds(seasonIds);
};

export default seasonsByIds
