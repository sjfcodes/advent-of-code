import fs from "fs";

const input = fs.readFileSync("template/Day_x:x/input.txt", {
  encoding: "utf8",
});

const getFormattedInput = () => {
  const rationsPerElfList = input.split("\n\n").map((line) => line.split("\n"));

  const caloriesPerElf = rationsPerElfList.map((list) =>
    list.reduce((acc, curr) => acc + Number(curr), 0)
  );

  const sorted = caloriesPerElf.sort((a, b) => b - a);

  return sorted;
};

const part1 = () => {
  console.log("part1");
  const [top] = getFormattedInput();
  console.log(top);
};

const part2 = () => {
  console.log("part2");
  const [first, second, third] = getFormattedInput();
  console.log(first + second + third);
};

console.log(getFormattedInput());
// part1();
// part2();
