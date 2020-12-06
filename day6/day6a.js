'use strict';

/*
* Thoughts on this problem
- This is all about managing Sets (and getting a sum of their lengths).
*/

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const groupQuestionsHandler = makeGroupQuestionsHandler();

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'day6-input.txt')),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  groupQuestionsHandler(line);
}).on('close', () => {
  console.log(groupQuestionsHandler(null));
});

function makeGroupQuestionsHandler() {
  let numQuestionsAnsweredYes = 0;
  const questionsAnsweredYes = new Set();

  const groupQuestionsHandler = (line) => {
    if (line === null) {
      if (questionsAnsweredYes.size > 0) {
        numQuestionsAnsweredYes += questionsAnsweredYes.size;
        questionsAnsweredYes.clear();
      }
      return numQuestionsAnsweredYes;
    }

    // As usual when I detect the end of a block with an empty string,
    // there needs to be an extra line on the bottom of the input
    if (line === '') {
      numQuestionsAnsweredYes += questionsAnsweredYes.size;
      questionsAnsweredYes.clear();
      return numQuestionsAnsweredYes;
    }

    line.split('').forEach((letter) => questionsAnsweredYes.add(letter));
  };
  return groupQuestionsHandler;
}
