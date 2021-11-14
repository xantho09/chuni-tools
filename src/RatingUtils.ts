import { chartConstants } from "./ChartConstants";
import { Score } from "./Types";

const calculateSongRating = ({ songTitle, score, difficulty }: Score) => {
  const chartConstant = chartConstants[difficulty][songTitle] as number;

  if (score >= 1_007_500) {
    return chartConstant + 2.0;
  } else if (score >= 1_005_000) {
    return chartConstant + 1.5;
  } else if (score >= 1_000_000) {
    return chartConstant + 1.0;
  } else if (score >= 975_000) {
    return chartConstant;
  } else if (score >= 925_000) {
    return chartConstant - 3.0;
  } else if (score >= 900_000) {
    return chartConstant - 5.0;
  } else if (score >= 800_000) {
    return (chartConstant - 5.0) / 2.0;
  } else {
    return 0.0;
  }
};

export const getTop30 = (highScores: Score[]) => {
  const allSongRatings = highScores.map((highScore) => {
    return {
      highScore,
      rating: calculateSongRating(highScore),
    };
  });

  // Sort by descending rating
  allSongRatings.sort((first, second) => second.rating - first.rating);
  return allSongRatings.slice(0, 30);
};
