const fs = require('fs');
const path = require('path');

fs.readdir(
  path.resolve(__dirname, './secret-folder'),
  { withFileTypes: true },
  (error, files) => {
    if (error) throw new Error('something got wrong...');
    for (const file of files) {
      if (file.isFile()) {
        const [name, ...ext] = file.name.split('.');
        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          (error, stats) => {
            if (error) throw new Error('something got wrong...');
            const weight = stats.size;
            console.log(`${name} - ${ext.at(-1)} - ${weight}`);
          }
        );
      }
    }
  }
);
