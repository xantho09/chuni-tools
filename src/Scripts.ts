import { getTop10RecentScores, getTop30HighScores } from "./RatingUtils";
import { fetchHighScores, fetchRecentScores } from "./ScoreScraper";

const sum = (array: number[]) => {
  return array.reduce((sum, value) => sum + value, 0.0);
};

const average = (array: number[]) => {
  // How does JS not have a built-in average or even sum function?
  return sum(array) / array.length;
};

export const runRatingAnalyzer = async () => {
  const highScores = await fetchHighScores();
  const top30HighScores = getTop30HighScores(highScores);

  console.log("Top 30 High Scores");
  console.table(top30HighScores);

  const top30Average = average(
    top30HighScores.map((highScore) => highScore.rating)
  );
  console.log(`Top 30 average: ${top30Average}`);

  const recentScores = await fetchRecentScores();
  const top10RecentScores = getTop10RecentScores(recentScores);

  console.log("Top 10 Recent Scores");
  console.table(top10RecentScores);

  const top10RecentAverage = average(
    top10RecentScores.map((score) => score.rating)
  );
  console.log(`Top 10 Recent Average: ${top10RecentAverage}`);

  const overallRating =
    (sum(top30HighScores.map((highScore) => highScore.rating)) +
      sum(top10RecentScores.map((score) => score.rating))) /
    40.0;
  console.log(`Overall Rating: ${overallRating}`);
};
