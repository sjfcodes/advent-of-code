import fs from "fs";
import path from "path";
import util from "util";

const log = (...args: any[]) =>
  // @ts-ignore
  console.log(util.inspect(...args, false, null, true /* enable colors */));

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const part1 = (input: string) => {
  const result = input;

  return result;
};

const part2 = (input: string) => {
  const result = input;

  return result;
};

log("part1");
log(part1(input)); // answer

log("part2");
log(part2(input)); // answer
