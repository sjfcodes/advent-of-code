import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8",
});

const part1 = (input: string) => {
  const [top] = input
    .split("\n\n")
    .map((line) =>
      line.split("\n").reduce((acc, curr) => acc + Number(curr), 0)
    )
    .sort((a, b) => b - a);

  return top;
};

const part2 = (input: string) => {
  const [first, second, third] = input
    .split("\n\n")
    .map((line) =>
      line.split("\n").reduce((acc, curr) => acc + Number(curr), 0)
    )
    .sort((a, b) => b - a);

  return first + second + third;
};

console.log("part1");
console.log(part1(input)); // 71471

console.log("part2");
console.log(part2(input)); // 211189
