import { chartConstants } from "./ChartConstants";
import { Score } from "./Types";

const calculateSongRating = ({ songTitle, score, difficulty }: Score) => {
  let rating = 0.0;
  const chartConstant = chartConstants[difficulty][songTitle] as
    | number
    | undefined;

  if (chartConstant === undefined) {
    console.log(`Song not found: [${songTitle}] ${difficulty}`);
    if (difficulty === "EXP") {
      console.log("Chart constant may be outside of analysis range.");
    }

    return {
      songTitle,
      score,
      difficulty,
      chartConstant: "Not Found",
      rating,
    };
  }

  if (score >= 1_007_500) {
    rating = chartConstant + 2.0;
  } else if (score >= 1_005_000) {
    rating = chartConstant + 1.5 + (score - 1_005_000) * 0.5;
  } else if (score >= 1_000_000) {
    rating = chartConstant + 1.0 + (score - 1_000_000) * 0.5;
  } else if (score >= 975_000) {
    rating = chartConstant + (score - 975_000) * 0.5;
  } else if (score >= 925_000) {
    rating = chartConstant - 3.0;
  } else if (score >= 900_000) {
    rating = chartConstant - 5.0;
  } else if (score >= 800_000) {
    rating = (chartConstant - 5.0) / 2.0;
  } else {
    rating = 0.0;
  }
  return {
    songTitle,
    score,
    difficulty,
    chartConstant,
    rating,
  };
};

export const getTop30HighScores = (highScores: Score[]) => {
  const allSongRatings = highScores.map(calculateSongRating);

  // Sort by descending rating
  allSongRatings.sort((first, second) => second.rating - first.rating);
  return allSongRatings.slice(0, 30);
};

export const getTop10RecentScores = (recentScores: Score[]) => {
  const recentScoresRatings = recentScores.map(calculateSongRating);

  // Sort by descending rating
  recentScoresRatings.sort((first, second) => second.rating - first.rating);
  return recentScoresRatings.slice(0, 10);
};
