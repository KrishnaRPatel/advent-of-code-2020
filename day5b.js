'use strict';

/*
*Thoughts on this problem
- This is a full flight, each row should have exactly 8 entries
- So, first plan of attack
 - make a Map of arrays through the columns by row number
 - example of a running Map: Map(1: [0,1,2], 2: [0,1,2,3])) etc.
 - throw out the map if it has 8 entries
 - There should only be one remaining Map and it should have 7 entries
 - The final entry should be the missing column
*/

const fs = require('fs');
const readline = require('readline');

const boardingPassHandler = makeBoardingPassHandler();

const rl = readline.createInterface({
  input: fs.createReadStream('day5-input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  boardingPassHandler(line);
}).on('close', () => {
  const seatRowMap = boardingPassHandler(null);
  seatRowMap.forEach((columnStrings, rowString) => {
    if (columnStrings.length === 7) {
      const columnIds = columnStrings.map((column) =>
        findSeatPosition(column, 0, 7)
      );
      const remainingColumnNum = columnIds
        .sort()
        .findIndex((columnId, index) => columnId !== index);

      const rowNum = findSeatPosition(rowString, 0, 127);
      const seatId = rowNum * 8 + remainingColumnNum;
      console.log(`${rowNum} * 8 + ${remainingColumnNum} = ${seatId}`);
    }
  });
});

function makeBoardingPassHandler() {
  const seatRowMap = new Map(); //
  const boardingPassHandler = (line) => {
    if (line === null) {
      return seatRowMap;
    }

    const rowString = line.slice(0, 7);
    const columnString = line.slice(7);

    if (seatRowMap.has(rowString)) {
      // push the new columnstring and check if it's full
      if (seatRowMap.get(rowString).push(columnString) === 8) {
        // clearing out full rows should keep the map size from becoming unnecessarily large
        seatRowMap.delete(rowString);
      }
    } else {
      seatRowMap.set(rowString, [columnString]);
    }
  };
  return boardingPassHandler;
}

function findSeatPosition(remainingSeatCodes, start, end) {
  if (remainingSeatCodes.length === 0) {
    return end;
  }
  const mid = Math.floor((start + end) / 2);
  if (
    remainingSeatCodes.startsWith('F') ||
    remainingSeatCodes.startsWith('L')
  ) {
    return findSeatPosition(
      remainingSeatCodes.slice(1, remainingSeatCodes.length),
      start,
      mid
    );
  }
  if (
    remainingSeatCodes.startsWith('B') ||
    remainingSeatCodes.startsWith('R')
  ) {
    return findSeatPosition(
      remainingSeatCodes.slice(1, remainingSeatCodes.length),
      mid,
      end
    );
  }
}
