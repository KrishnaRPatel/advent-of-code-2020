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
  return Object.keys(checkValidity).every((detail) => {
    return checkValidity[detail](passportDetails[detail]);
  });
}

/**
There are 10 properties

    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.

**/

const checkValidity = {
  byr: (val) => {
    if (val) {
      const year = Number(val);
      if (isNaN(year)) {
        return false;
      }
      return year >= 1920 && year <= 2002;
    }
    return false;
  },

  iyr: (val) => {
    if (val) {
      const year = Number(val);
      if (isNaN(year)) {
        return false;
      }
      return year >= 2010 && year <= 2020;
    }
    return false;
  },

  eyr: (val) => {
    if (val) {
      const year = Number(val);
      if (isNaN(year)) {
        return false;
      }
      return year >= 2020 && year <= 2030;
    }
    return false;
  },

  hgt: (val) => {
    if (val) {
      // need at least 4 chars
      if (val.length < 4) {
        return false;
      }
      const height = Number(val.slice(0, val.length - 2));
      if (val.endsWith('cm')) {
        return height >= 150 && height <= 193;
      }
      if (val.endsWith('in')) {
        return height >= 59 && height <= 76;
      }
    }
    return false;
  },

  hcl: (val) => {
    if (val) {
      //regex has its uses and this is certainly one of them
      const hexCodeRegEx = /#[0-9A-Fa-f]{6}/g;
      return hexCodeRegEx.test(val);
    }
    return false;
  },

  ecl: (val) => {
    if (val) {
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val);
    }
    return false;
  },

  pid: (val) => {
    if (val) {
      return !isNaN(val) && val.length === 9;
    }
    return false;
  },
  cid: () => true,
};

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
