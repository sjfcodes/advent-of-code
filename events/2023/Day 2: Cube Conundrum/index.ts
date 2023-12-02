import fs from "fs";
import path from "path";
import util from "util";

const log = (...args: any[]) =>
  // @ts-ignore
  console.log(util.inspect(...args, false, null, true /* enable colors */));

type MaxMap = { [color: string]: number };
const ex1input = fs.readFileSync(path.resolve(__dirname, "./example.txt"), {
  encoding: "utf8",
});
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const common = (input: string, maxMapByColor: MaxMap) => {
  const result = input.split("\n").map((line) => {
    const rounds = line.split("; ");
    const [title, round1] = rounds.shift().split(":");
    const id = Number(title.toLowerCase().replace("game ", ""));
    /**
     * [
     *   [ '3 blue', '4 red' ],
     *   [ '1 red', '2 green', '6 blue' ],
     *   [ '2 green' ]
     * ]
     */
    const gameData = [
      round1.trim().split(", "),
      ...rounds.map((round) => round.split(", ")),
    ];

    // find max cubes of color seen per round
    const maxMap = gameData.reduce(
      (acc, rounds /** [ '3 blue', '4 red' ] */) => {
        for (const round of rounds) {
          //  '3 blue'
          const [strCount, color] = round.split(" ");
          const count = Number(strCount);
          if (count > acc[color]) {
            acc[color] = count;
          }
        }
        return acc;
      },
      { red: 0, green: 0, blue: 0 } as { [color: string]: number }
    );

    let allColorsInRange = true;
    // check for cube colors out of range for game
    for (const [color, count] of Object.entries(maxMap)) {
      if (count > maxMapByColor[color]) {
        allColorsInRange = false;
      }
    }

    return [id, maxMap, allColorsInRange] as [number, MaxMap, boolean];
  });

  return result;
};

const part1 = (input: string, maxByColorMap: MaxMap) => {
  const result = common(input, maxByColorMap);

  const sumOfPossibleGames = result.reduce(
    (acc, [id, _, inRange]) => (inRange ? acc + id : acc),
    0
  );

  return sumOfPossibleGames;
};

const part2 = (input: string, maxByColorMap: MaxMap) => {
  const result = common(input, maxByColorMap);

  const sumOfPowers = result.reduce((acc, [, maxMap]) => {
    const powers = Object.values(maxMap).reduce((acc, curr) => acc * curr, 1);
    return acc + powers;
  }, 0);

  return sumOfPowers;
};

// log("part1");
// const exMaxByColor: MaxMap = { red: 12, green: 13, blue: 14 };
// log(part1(ex1input, exMaxByColor)); // 8
// log(part1(input, exMaxByColor)); // 1867

log("part2");
log(part2(ex1input, {})); // 2286
log(part2(input, {})); // 84538
