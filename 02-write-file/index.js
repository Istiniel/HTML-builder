const path = require('path');
const fs = require('fs');
const { stdin: input } = process;
const readline = require('node:readline');

fs.writeFile(path.join(__dirname, 'output.txt'), '', (err) => {
  if (err) throw new Error('something got wrong...');
  console.log('Please enter text: ');
});

const output = fs.createWriteStream(path.join(__dirname, 'output.txt'), {
  encoding: 'utf-8',
});

const rl = readline.createInterface({ input, output });

rl.on('line', (line) => {
  if (line.trim() === 'exit') {
    console.log('Goodbuy!');
    rl.close();
  } else {
    output.write(`${line}\n`);
  }
});

process.on('SIGINT', function () {
  console.log('Goodbuy!');
  process.exit();
});
