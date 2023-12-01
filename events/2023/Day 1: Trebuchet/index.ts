import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const part1 = (input: string) => {
  const result = input.split("\n").reduce((sum, line) => {
    const numbers = line.split("").filter((char) => !isNaN(Number(char)));
    const number = Number([numbers.at(0), numbers.pop()].join(""));
    return sum + number;
  }, 0);

  return result;
};

const part2 = (input: string) => {
  const replaced = [
    ["one", "one1one"],
    ["two", "two2two"],
    ["three", "three3three"],
    ["four", "four4four"],
    ["five", "five5five"],
    ["six", "six6six"],
    ["seven", "seven7seven"],
    ["eight", "eight8eight"],
    ["nine", "nine9nine"],
  ].reduce((str, [find, replace]) => {
    return str.replaceAll(find, replace);
  }, input);

  return part1(replaced);
};

console.log("part1");
console.log(part1(input)); // 55712

console.log("part2");
console.log(part2(input)); // 55413
