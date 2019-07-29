import seasonCreate from "./seasonCreate";
import seasonsGetByName from "./seasonsGetByName";
import seasonGetByIds from "./seasonGetByIds";
import seasonsGet from "./seasonsGet";
import weeksGetByIds from "./weeksGetByIds";
import weeksGetBySeasonIds from "./weeksGetBySeasonIds";

const datafetchers = () => ({
    seasonCreate,
    seasonsGetByName,
    seasonGetByIds,
    seasonsGet,
    weeksGetByIds,
    weeksGetBySeasonIds,
});

export default datafetchers;