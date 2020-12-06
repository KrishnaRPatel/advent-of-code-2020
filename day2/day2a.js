'use strict';

const fs = require('fs');
const readline = require('readline');
const path = require('path');

let goodPasswords = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'day2-input.txt')),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  if (goodPassword(line)) {
    goodPasswords++;
  }
}).on('close', () => {
  console.log(goodPasswords);
});

function goodPassword(passwordLine) {
  const arr = passwordLine.split(' ');

  const [min, max] = arr[0].split('-').map((el) => Number(el));

  const letter = arr[1].charAt(0);

  const string = arr[2];

  let count = 0;
  for (const char of string) {
    if (char === letter) {
      count++;
    }
  }
  return count <= max && count >= min;
}
