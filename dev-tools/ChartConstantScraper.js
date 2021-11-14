// Link: https://chunithm.gamerch.com/CHUNITHM%20PARADISE%20LOST%20%E6%A5%BD%E6%9B%B2%E4%B8%80%E8%A6%A7%EF%BC%88%E5%AE%9A%E6%95%B0%E9%A0%86%EF%BC%891

const parseTable = (table) => {
  const output = {
    MAS: {},
    EXP: {},
  };
  const rows = [...table.getElementsByTagName("tr")];

  let chartConstant = 14.2;
  let difficulty = "MAS";
  // Start from 1, skip the initial headers
  for (let i = 1; i < rows.length; ++i) {
    const row = rows[i];
    for (const child of row.children) {
      if (child.tagName === "TH") {
        // New chart constantrow
        chartConstant = parseFloat(child.innerText);
        // console.log(child);
        // console.log(`New chart constant: ${chartConstant}`);
        continue;
      }

      // Otherwise, it's a TD
      const columnNumber = parseInt(child.dataset.col);
      if (columnNumber === 0) {
        // Difficulty column
        difficulty = child.innerText;
        // console.log(child);
        // console.log(`New difficulty: ${difficulty}`);
      } else if (columnNumber === 2) {
        // Song
        const songName = child.innerText.replaceAll("\n", " ");
        output[difficulty][songName] = chartConstant;
      }
    }
  }

  return output;
};

const tables = [...document.getElementsByTagName("table")].slice(1, 5);
const parsedTables = tables.map(parseTable);

const combinedTable = {
  MAS: Object.assign({}, ...parsedTables.map((table) => table["MAS"])),
  EXP: Object.assign({}, ...parsedTables.map((table) => table["EXP"])),
};
