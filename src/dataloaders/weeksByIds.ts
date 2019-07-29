import weeksGetByIds from "../datafetchers/weeksGetByIds";

const weeksByIds   = async (weekIds) => {
    return weeksGetByIds(weekIds);
};

export default weeksByIds
