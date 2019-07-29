
import weeksByIds from "./weeksByIds";
import seasonsByIds from "./seasonsByIds";
import weeksBySeasonIds from "./weeksBySeasonIds";

const DataLoader = require('dataloader');
const dataloaders = () => ({
    weeksByIds: new DataLoader(weeksByIds),
    weeksBySeasonIds: new DataLoader(weeksBySeasonIds),
    seasonsByIds: new DataLoader(seasonsByIds),
});

export default dataloaders;