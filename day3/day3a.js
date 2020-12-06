'use strict';

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'day3-input.txt')),
  crlfDelay: Infinity,
});

//Three right, one down.
rl.on('line', (line) => {
  traverse(line);
}).on('close', () => {
  traverse('', true);
});

function isTree(char) {
  return char === '#';
}

function makeTraverse() {
  let first = true;
  let startPosition = 0;
  let numTrees = 0;
  return (line, getNum = false) => {
    if (getNum) {
      console.log(`Number of trees encountered: ${numTrees}`);
    }
    if (!isTree(line[startPosition]) || first) {
      // no trees should be recorded on the first line
      first = false;
    } else {
      numTrees++;
    }
    startPosition = (startPosition + 3) % line.length;
  };
}

const traverse = makeTraverse();
