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

  const [one, two] = arr[0].split('-').map((el) => Number(el));

  const letter = arr[1].charAt(0);

  const string = arr[2];

  // Note: Now I'm feeling the pain of not having a logical xor in js!
  // I vaguely remember how to create a XOR with the basics, but was
  // curious how to do this in a more js friendly way. Turns out
  // the ternary operator is perfect for this!

  const [letterOneMatch, letterTwoMatch] = [
    string[one - 1] === letter,
    string[two - 1] === letter,
  ];

  return letterOneMatch ? !letterTwoMatch : letterTwoMatch;
}
