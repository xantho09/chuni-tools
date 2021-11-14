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

const extractRecentScores = (document: Document) => {};

const fetchPage = async (url: string) => {
  const response = await fetch(url, { method: "GET", credentials: "include" });
  const htmlAsText = await response.text();

  const parser = new DOMParser();
  return parser.parseFromString(htmlAsText, "text/html");
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
