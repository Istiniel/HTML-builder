const fs = require('fs');
const path = require('path');

fs.readdir(
  path.resolve(__dirname, './secret-folder'),
  { withFileTypes: true },
  (error, files) => {
    if (error) throw new Error('something got wrong...');
    for (const file of files) {
      if (file.isFile()) {
        const fileInfo = file.name.split('.');
        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          (error, stats) => {
            if (error) throw new Error('something got wrong...');
            const weight = stats.size;
            console.log(
              `${fileInfo
                .slice(0, fileInfo.length - 1)
                .join('.')} - ${fileInfo.at(-1)} - ${weight}`
            );
          }
        );
      }
    }
  }
);
