import { getTop30 } from "./RatingUtils";
import { fetchHighScores } from "./ScoreScraper";

const run = async () => {
  const highScores = await fetchHighScores();
  const top30HighScores = getTop30(highScores);

  console.table(top30HighScores);
};
