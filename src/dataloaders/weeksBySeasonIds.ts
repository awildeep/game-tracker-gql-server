import weeksGetBySeasonIds from "../datafetchers/weeksGetBySeasonIds";

const weeksBySeasonIds   = async (seasonIds) => {
    return weeksGetBySeasonIds(seasonIds).then(rows=>{
            return seasonIds.map(
                remapId => rows.filter(x => x.season_id === Number(remapId))
            )
        });
};

export default weeksBySeasonIds;
