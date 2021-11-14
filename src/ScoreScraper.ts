import { Score } from "./Types";

const extractHighScores = (document: Document, difficulty: "MAS" | "EXP") => {
  const output: Score[] = [];
  const scoreElements = [
    ...document.getElementsByClassName("play_musicdata_highscore"),
  ];

  for (const scoreElement of scoreElements) {
    const score = parseInt(
      (scoreElement.children[0] as HTMLElement).innerText.replaceAll(",", "")
    );
    const songTitle = (
      scoreElement.parentElement!.getElementsByClassName(
        "music_title"
      )[0] as HTMLElement
    ).innerText;

    output.push({
      songTitle,
      difficulty,
      score,
    });
  }

  return output;
};

const extractRecentScores = (document: Document) => {
  const output: Score[] = [];
  const scoreElements = [...document.getElementsByClassName("play_data_side")];

  for (const scoreElement of scoreElements) {
    const difficultyDiv =
      scoreElement.getElementsByClassName("play_track_result")[0];
    const difficultyImgSource = (difficultyDiv.children[0] as HTMLImageElement)
      .src;

    let difficulty: "MAS" | "EXP";
    if (difficultyImgSource.includes("master")) {
      difficulty = "MAS";
    } else if (difficultyImgSource.includes("expert")) {
      difficulty = "EXP";
    } else {
      // Skipping ADV and BAS. Otherwise, possibly World's End
      continue;
    }

    const songTitle = (
      scoreElement.getElementsByClassName(
        "play_musicdata_title"
      )[0] as HTMLElement
    ).innerText;

    const scoreString = (
      scoreElement.getElementsByClassName(
        "play_musicdata_score_text"
      )[0] as HTMLElement
    ).innerText;
    const score = parseInt(scoreString.substring(6).replaceAll(",", ""));

    output.push({
      songTitle,
      difficulty,
      score,
    });
  }

  return output;
};

const fetchPage = async (url: string) => {
  const response = await fetch(url, { method: "GET", credentials: "include" });
  const htmlAsText = await response.text();

  const parser = new DOMParser();
  const output = parser.parseFromString(htmlAsText, "text/html");
  return output;
};

export const fetchHighScores = async () => {
  return [
    ...extractHighScores(
      await fetchPage("/mobile/record/musicGenre/master"),
      "MAS"
    ),
    ...extractHighScores(
      await fetchPage("/mobile/record/musicGenre/expert"),
      "EXP"
    ),
  ];
};

export const fetchRecentScores = async () => {
  return extractRecentScores(await fetchPage("/mobile/record/playlog"));
};
