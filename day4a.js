'use strict';

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('day4-input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  passportHandler(line);
}).on('close', () => {
  console.log(`Valid Passports: ${passportHandler(null, true)}`);
});

function makePassportHandler() {
  let passportDetails = {};
  let validPassports = 0;
  const passportHandler = (line, getValidPassportNum = false) => {
    if (getValidPassportNum) {
      return validPassports;
    }
    if (line === '') {
      //the last line needs to be an empty line
      if (checkPassportValidity(passportDetails)) {
        validPassports++;
        console.log(passportDetails);
      }
      passportDetails = {};
    } else {
      //parse line into an array of [key, value]s
      const passportBlob = line.split(' ');

      passportBlob.forEach((detail) => {
        const keyValue = detail.split(':');
        if (keyValue[1]) {
          passportDetails[keyValue[0]] = keyValue[1];
        }
      });
    }
  };
  return passportHandler;
}

function checkPassportValidity(passportDetails) {
  if (passportDetails.cid) {
    return Object.keys(passportDetails).length === 8;
  }
  return Object.keys(passportDetails).length === 7;
}

const passportHandler = makePassportHandler();

/**
There are 10 properties
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)
**/

//TODO: refactor to object.from and object.assign
