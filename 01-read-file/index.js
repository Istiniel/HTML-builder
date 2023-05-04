const path = require('path');
const fs = require('fs');

const { stdout } = process;

const input = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

input.pipe(stdout);
