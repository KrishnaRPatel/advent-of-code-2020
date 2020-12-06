'use strict';

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const numMap = new Map();
const FIND = 2020;
const nums = [];

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'day1-input.txt')),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  const num = Number(line);
  nums.push(num);
}).on('close', () => {
  const result = findMatchingSet(0, numMap, nums);
  console.log(
    `Sum of ${result} = 2020\nProduct of ${result} = ${result.reduce(
      (prev, current) => prev * current
    )}`
  );
});

function findMatchingSet(baseNumIndex, numMap, nums) {
  if (baseNumIndex >= nums.length) {
    console.dir(numMap);
    throw Error('Not found');
  }

  const baseNum = nums[baseNumIndex];

  for (const num of nums.slice(baseNumIndex + 1)) {
    if (numMap.has(num)) {
      return [num, ...numMap.get(num)];
    }
    const target = FIND - baseNum - num;
    numMap.set(target, [baseNum, num]);
  }

  return findMatchingSet(baseNumIndex + 1, numMap, nums);
}

// Just one more number and we've added a whole magnitude of complexity.

// Instead of just one set of target numbers, I think each number should be Mapped to it's own set

// Thought process

// -- LOOK FOR 46 --
// const nums = [4, 8, 15, 16, 23, 42]
// threeAddUpTo(46, nums) // Should equal [8, 15, 23]

// START with first element (4) compared with the rest
// 4, 8
// Map = {}
// is num 8 in Map? (no)
// target = 46 - 4 - 8 = 34
// Map = {34: [4, 8]}

// 4, 15
// Map = {34: [4, 8]}
// is num (15) in Map? (no)
// target = 46 - 4 - 15 = 27
// Map = {34: [4, 8], 27: [4, 15]}

// 4, 16
// Map = {34: [4, 8], 24: [4, 15]}
// is num (16) in Map? (no)
// target = 46 - 4 - 16 = 26
// Map = {34: [4, 8], 27: [4, 15], 26: [4, 16]}

// 4, 23
// Map = {34: [4, 8], 24: [4, 15], 26: [4, 16]}
// is num (23) in Map? (no)
// target = 46 - 4 - 23 = 19
// Map = {34: [4, 8], 27: [4, 15], 26: [4, 16], 19: [4, 23]}

// 4, 42 SKIP
// Map = {34: [4, 8], 24: [4, 15], 26: [4, 16]}
// is num (23) in Map? (no)
// target = 46 - 42 - 4 = 0
// if target <= 0, skip TODO: add this check part
// Map = {34: [4, 8], 27: [4, 15], 26: [4, 16], 19: [4, 23]}

// START: 8
// 8, 16
// Map = {34: [4, 8], 24: [4, 15], 26: [4, 16]}
// is num (23) in Map? (no)
// target = 46 - 4 - 23 = 19
// Map = {34: [4, 8], 27: [4, 15], 26: [4, 16], 19: [4, 23]}
