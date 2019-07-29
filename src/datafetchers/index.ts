import seasonGetByIds from "./seasonGetByIds";
import seasonsGet from "./seasonsGet";
import weeksGetByIds from "./weeksGetByIds";
import weeksGetBySeasonIds from "./weeksGetBySeasonIds";

const datafetchers = () => ({
    seasonGetByIds,
    seasonsGet,
    weeksGetByIds,
    weeksGetBySeasonIds,
});

export default datafetchers;