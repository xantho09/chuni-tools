const extractHighScores = (document) => {
  const output = {};
  const scoreElements = [
    ...document.getElementsByClassName("play_musicdata_highscore"),
  ];

  for (const scoreElement of scoreElements) {
    const score = parseInt(
      scoreElement.children[0].innerText.replaceAll(",", "")
    );
    const songTitle =
      scoreElement.parentElement.getElementsByClassName("music_title")[0]
        .innerText;

    output[songTitle] = score;
  }

  return output;
};

const fetchPage = async (url) => {
  const response = await fetch(url, { method: "GET", credentials: "include" });
  const htmlAsText = await response.text();

  const parser = new DOMParser();
  return parser.parseFromString(htmlAsText, "text/html");
};

const highScores = {
  MAS: extractHighScores(await fetchPage("/mobile/record/musicGenre/master")),
  EXP: extractHighScores(await fetchPage("/mobile/record/musicGenre/expert")),
};
