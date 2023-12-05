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

const part1 = (input: string) => {
  const isNum = (c: string) => !isNaN(Number(c));
  const result = input.split("\n").reduce((acc, line, i, lines) => {
    let sumForLine = 0;

    // console.log(line);
    // console.log("----------------");
    for (let j = 0; j < line.length; j++) {
      let num = line[j];
      if (!isNum(num)) {
        // console.log(j, num, "continue");
        continue;
      }
      let leftIdx = j;
      let lookLeft = true;

      while (lookLeft) {
        let right = line[j + 1];
        if (isNum(right)) {
          num += right;
          j++;
        } else lookLeft = false;
      }

      /**
       * scan perimeter if num for symbols
       */
      const perimeter = [
        ...(lines[i - 1]?.substring(leftIdx - 1, j + 2) || ""),
        line[leftIdx - 1],
        line[j + 1],
        ...(lines[i + 1]?.substring(leftIdx - 1, j + 2) || ""),
      ];

      const symbols = perimeter.filter(
        (c) => c && c !== "." && isNaN(Number(c))
      );
      if (symbols.length) {
        // console.log(j, line, "-->", num, symbols);
        sumForLine += Number(num);
      }
    }
    // console.log("\n");
    return acc + sumForLine;
  }, 0);

  return result;
};

const part2 = (input: string) => {
  const isNum = (c: string) => !isNaN(Number(c));
  const result = input.split("\n").reduce((acc, line, i, lines) => {
    let sumForLine = 0;

    console.log(line);
    console.log("----------------");
    for (let j = 0; j < line.length; j++) {
      let num = line[j];
      if (!isNum(num)) {
        // console.log(j, num, "continue");
        continue;
      }
      let leftIdx = j;
      let lookLeft = true;

      while (lookLeft) {
        let right = line[j + 1];
        if (isNum(right)) {
          num += right;
          j++;
        } else lookLeft = false;
      }

      /**
       * scan perimeter of num for symbols
       */
      const perimeter = [
        line[j + 1],
        ...(lines[i + 1]?.substring(leftIdx - 1, j + 2) || ""),
      ];

      const symbols = perimeter.filter((c) => c && c === "*");

      if (symbols.length) {
        console.log(j, line, "-->", num, symbols);
        sumForLine += Number(num);
      }
    }

    console.log("\n");
    return acc + sumForLine;
  }, 0);
  return result;
};

// log("part1");
// log(part1(exInput)); // 4361
// log(part1(input)); // 527446

log("part2");
log(part2(exInput)); // 467835
// log(part2(input)); // answer
