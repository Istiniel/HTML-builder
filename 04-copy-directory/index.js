const fs = require('fs');
const path = require('path');

fs.rm(
  path.resolve(__dirname, './files-copy'),
  { recursive: true, force: true },
  (error) => {
    if (error) throw new Error('something got wrong...');

    fs.mkdir(
      path.join(__dirname, 'files-copy'),
      { recursive: true },
      (error) => {
        if (error) throw new Error('something got wrong...');

        fs.readdir(
          path.resolve(__dirname, './files'),
          { withFileTypes: true },
          (error, files) => {
            if (error) throw new Error('something got wrong...');
            for (const file of files) {
              if (file.isFile()) {
                fs.copyFile(
                  path.resolve(__dirname, './files', `${file.name}`),
                  path.resolve(__dirname, './files-copy', `${file.name}`),
                  (error) => {
                    if (error) throw new Error('something got wrong...');
                  }
                );
              }
            }
          }
        );
      }
    );
  }
);
