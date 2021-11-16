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

  const boundaries = [
    [1_010_000, chartConstant + 2.0],
    [1_007_500, chartConstant + 2.0],
    [1_005_000, chartConstant + 1.5],
    [1_000_000, chartConstant + 1.0],
    [975_000, chartConstant],
    [925_000, chartConstant - 3.0],
    [900_000, chartConstant - 5.0],
    [800_000, (chartConstant - 5.0) / 2],
    [500_000, 0],
    [0, 0],
  ];

  for (let i = 0; i < boundaries.length - 1; ++i) {
    const [upperBound, upperRating] = boundaries[i];
    const [lowerBound, lowerRating] = boundaries[i + 1];

    if (lowerBound <= score && score <= upperBound) {
      rating =
        lowerRating +
        ((score - lowerBound) / (upperBound - lowerBound)) *
          (upperRating - lowerRating);
      break;
    }
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
