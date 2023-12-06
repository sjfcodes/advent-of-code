import fs from "fs";
import path from "path";
import util from "util";

const log = (...args: any[]) =>
  // @ts-ignore
  console.log(util.inspect(...args, false, null, true /* enable colors */));

const exInput = fs.readFileSync(path.resolve(__dirname, "./example.txt"), {
  encoding: "utf8",
});
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

/**
 *         [winning nums] | [card nums]
 * Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
 *                          83 86       17    48      has matches
 *                           1  2        4     8      for 8 points
 */

type CardModel = {
  [card: string]: {
    line: string;
    winNums: number[];
    cardNums: number[];
    matches: number[];
    points: number;
  };
};

const part1 = (input: string) => {
  const model = input.split("\n").reduce((acc, line) => {
    const [cardKey, data] = line.split(":");
    const [winNums, cardNums] = data.split("|").map(
      (group) =>
        group
          .trim()
          .split(" ") // separate by single space
          .filter((str) => !!str) // remove empty characters
          .map((strNum) => Number(strNum)) // convert strings to nums
          .sort((a, b) => a - b) // sort for funsies
    );

    const matches = cardNums.filter((cardNum) => winNums.includes(cardNum));

    const points = matches.length
      ? matches.reduce((acc, num, idx) => {
          return acc === 0 ? 1 : acc * 2;
        }, 0)
      : 0;

    acc[cardKey] = {
      line,
      winNums,
      cardNums,
      matches,
      points,
    };
    return acc;
  }, {} as CardModel);

  log(model);
  return Object.values(model).reduce((acc, model) => acc + model.points, 0);
};

const part2 = (input: string) => {
  const result = input;

  return result;
};

log("part1");
// log(part1(exInput)); // 13
log(part1(input)); // 21821

// log("part2");
// log(part2(exInput)); // answer
// log(part2(input)); // answer
