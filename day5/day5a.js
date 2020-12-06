'use strict';

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'day5-input.txt')),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  boardingPassHandler(line);
}).on('close', () => {
  console.log(`Highest passport id: ${boardingPassHandler(null)}`);
});

function makeBoardingPassHandler() {
  let highestSeatId = 0;
  const boardingPassHandler = (line) => {
    if (line === null) {
      return highestSeatId;
    }

    const rowString = line.slice(0, 7);
    const columnString = line.slice(7);
    const rowNum = findNumber(rowString, 0, 127);
    const columnNum = findNumber(columnString, 0, 7);
    const seatId = rowNum * 8 + columnNum;
    if (highestSeatId < seatId) {
      highestSeatId = seatId;
    }
  };
  return boardingPassHandler;
}

const boardingPassHandler = makeBoardingPassHandler();

function findNumber(remainingSeatCodes, start, end) {
  if (remainingSeatCodes.length === 0) {
    return end;
  }
  const mid = Math.floor((start + end) / 2);
  if (
    remainingSeatCodes.startsWith('F') ||
    remainingSeatCodes.startsWith('L')
  ) {
    return findNumber(
      remainingSeatCodes.slice(1, remainingSeatCodes.length),
      start,
      mid
    );
  }
  if (
    remainingSeatCodes.startsWith('B') ||
    remainingSeatCodes.startsWith('R')
  ) {
    return findNumber(
      remainingSeatCodes.slice(1, remainingSeatCodes.length),
      mid,
      end
    );
  }
}
