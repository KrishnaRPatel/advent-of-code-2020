'use strict';

/*
* Thoughts on this problem
- We can change the Set from day6a to a Map that keeps track of
the number of times a property has been seen.
*/

const fs = require('fs');
const readline = require('readline');

const groupQuestionsHandler = makeGroupQuestionsHandler();

const rl = readline.createInterface({
  input: fs.createReadStream('day6-input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  groupQuestionsHandler(line);
}).on('close', () => {
  console.log(groupQuestionsHandler(null));
});

function makeGroupQuestionsHandler() {
  let groupQuestionsAnsweredYes = 0;
  const questionsAnsweredYes = new Map();
  let groupSize = 0;

  const groupQuestionsHandler = (line) => {
    if (line === null) {
      if (questionsAnsweredYes.size > 0) {
        groupQuestionsAnsweredYes += getUnanimousYes(
          questionsAnsweredYes,
          groupSize
        );
        questionsAnsweredYes.clear();
        groupSize = 0;
      }
      return groupQuestionsAnsweredYes;
    }

    if (line === '') {
      groupQuestionsAnsweredYes += getUnanimousYes(
        questionsAnsweredYes,
        groupSize
      );
      questionsAnsweredYes.clear();
      groupSize = 0;
      return groupQuestionsAnsweredYes;
    }

    groupSize++;
    line.split('').forEach((letter) => {
      if (questionsAnsweredYes.has(letter)) {
        questionsAnsweredYes.set(letter, questionsAnsweredYes.get(letter) + 1);
      } else {
        questionsAnsweredYes.set(letter, 1);
      }
    });
  };
  return groupQuestionsHandler;
}

function getUnanimousYes(questionsAnsweredYes, groupSize) {
  let unanimousYes = 0;
  questionsAnsweredYes.forEach((num) => {
    if (num === groupSize) {
      unanimousYes++;
    }
  });
  return unanimousYes;
}
