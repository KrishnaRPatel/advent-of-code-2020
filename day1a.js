'use strict';

const fs = require('fs');
const readline = require('readline');

const numberSet = new Set();

const rl = readline.createInterface({
  input: fs.createReadStream('day1-input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  const num = Number(line);
  const target = 2020 - num;
  if (numberSet.has(target)) {
    console.log(
      `${num} + ${target} = 2020 \n${num} * ${target} = ${num * target}`
    );
    rl.close();
    rl.removeAllListeners();
  }
  numberSet.add(num);
});

// Note: needed to find complementary pairs
