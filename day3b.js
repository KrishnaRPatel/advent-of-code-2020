'use strict';

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('day3-input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  traverse1(line);
  traverse2(line);
  traverse3(line);
  traverse4(line);
  traverse5(line);
}).on('close', () => {
  console.log(
    'product = ',
    [
      traverse1('', true),
      traverse2('', true),
      traverse3('', true),
      traverse4('', true),
      traverse5('', true),
    ].reduce((prev, num) => prev * num)
  );
});

function isTree(char) {
  return char === '#';
}

function makeTraverse(right, down) {
  let first = true;
  let startPosition = 0;
  let numTrees = 0;
  let rowNum = 0;
  return (line, getNum = false) => {
    if (getNum) {
      console.log(
        `right: ${right}, down: ${down} => number of trees: ${numTrees}`
      );
      return numTrees;
    }
    if (rowNum % down === 0) {
      if (!isTree(line[startPosition]) || first) {
        // no trees should be recorded on the first line
        first = false;
      } else {
        numTrees++;
      }
      startPosition = (startPosition + right) % line.length;
    }
    rowNum++;
  };
}

const traverse1 = makeTraverse(1, 1); //right 1, down 1
const traverse2 = makeTraverse(3, 1); //right 3, down 1 (from day3a.js)
const traverse3 = makeTraverse(5, 1); // right 5, down 1
const traverse4 = makeTraverse(7, 1); // right 7, down 1
const traverse5 = makeTraverse(1, 2); // right 1, down 2
