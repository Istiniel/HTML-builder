const fs = require('fs');
const path = require('path');

fs.rm(
  path.resolve(__dirname, './project-dist'),
  { recursive: true, force: true },
  (error) => {
    if (error) throw new Error('something got wrong1...');

    fs.mkdir(path.resolve(__dirname, './project-dist'), (error) => {
      if (error) throw new Error('something got wrong2...');

      fs.writeFile(
        path.resolve(__dirname, './project-dist', 'bundle.css'),
        '',
        (error) => {
          if (error) throw new Error('something got wrong3...');

          const output = fs.createWriteStream(
            path.resolve(__dirname, './project-dist', 'bundle.css')
          );

          fs.readdir(
            path.resolve(__dirname, './styles'),
            { withFileTypes: true },
            (error, files) => {
              if (error) throw new Error('something got wrong3...');
              for (const file of files) {
                const [, ...ext] = file.name.split('.');

                if (file.isFile() && ext.at(-1) === 'css') {
                  const input = fs.createReadStream(
                    path.resolve(__dirname, './styles', `${file.name}`),
                    {
                      encoding: 'utf-8',
                    }
                  );
                  input.pipe(output);
                }
              }
            }
          );
        }
      );
    });
  }
);
