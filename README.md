# Advent Of Code 2020

Krishna Patel's [Advent of Code 2020](https://adventofcode.com) solutions, written with Node file streaming in mind.

## How to run

To specify the node version to run these solutions (if you have `nvm` installed):

```bash
nvm use
```

To run a solution, change the working directory to the project directory (ex. `cd advent-of-code-2020`) and:

```bash
node day1/day1a
```

The solution will output to the terminal.

## Implementation details

The goal was to work on rounding out my JS and Node skills. I don't want to treat every problem as though I have unlimited resources (space and time). Thus, I thought treating the inputs as a stream of inputs would make sense (so I can handle code line by line or block by block). This way, the input size wouldn't hurt the solution too poorly, especially where space is concerned.

## On these being actual solutions

Only code that outputs answers accepted by `Advent of Code 2020` is pushed to the main branch. Since these are _working_ solutions, I've avoided refactoring after getting a working solution as much as I can. The code quality should be readable, but feel free to drop a note if you have any suggestions!
