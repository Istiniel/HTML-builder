const fs = require('fs');
const path = require('path');

fs.rm(
  path.resolve(__dirname, './project-dist'),
  { recursive: true, force: true },
  (error) => {
    if (error) throw new Error('something got wrong1...');

    fs.mkdir(
      path.resolve(__dirname, './project-dist'),
      { recursive: true },
      (error) => {
        if (error) throw new Error('something got wrong2...');

        createCSS();
        copyAssets();
        uniteTemplate();
      }
    );
  }
);

function createCSS() {
  fs.writeFile(
    path.resolve(__dirname, './project-dist', 'style.css'),
    '',
    (error) => {
      if (error) throw new Error('something got wrong3...');

      const output = fs.createWriteStream(
        path.resolve(__dirname, './project-dist', 'style.css')
      );

      fs.readdir(
        path.resolve(__dirname, './styles'),
        { withFileTypes: true },
        (error, files) => {
          if (error) throw new Error('something got wrong4...');
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
}

function copyAssets() {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true },
    (error) => {
      if (error) throw new Error('something got wrong5...');

      fs.readdir(
        path.resolve(__dirname, './assets'),
        { withFileTypes: true },
        (error, files) => {
          if (error) throw new Error('something got wrong6...');
          for (const file of files) {
            if (file.isDirectory) {
              copyFolder(file.name);
            }

            if (file.isFile()) {
              fs.copyFile(
                path.resolve(__dirname, './assets', `${file.name}`),
                path.join(__dirname, 'project-dist', 'assets', `${file.name}`),
                (error) => {
                  if (error) throw new Error('something got wrong12...');
                }
              );
            }
          }
        }
      );
    }
  );
}

function copyFolder(foldername) {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets', foldername),
    { recursive: true },
    (error) => {
      if (error) throw new Error('something got wrong10...');
      fs.readdir(
        path.resolve(__dirname, './assets', `./${foldername}`),
        { withFileTypes: true },
        (error, files) => {
          if (error) throw new Error('something got wrong11...');
          for (const file of files) {
            if (file.isFile()) {
              fs.copyFile(
                path.resolve(
                  __dirname,
                  './assets',
                  `./${foldername}`,
                  `${file.name}`
                ),
                path.join(
                  __dirname,
                  'project-dist',
                  'assets',
                  `./${foldername}`,
                  `${file.name}`
                ),
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

function uniteTemplate() {
  fs.readFile(
    path.resolve(__dirname, 'template.html'),
    'utf8',
    function (err, data) {
      if (err) {
        return console.log(err);
      }
      let result = data;

      fs.readdir(
        path.resolve(__dirname, './components'),
        { withFileTypes: true },
        (error, files) => {
          if (error) throw new Error('something got wrong7...');

          replacePart(result, files);
        }
      );
    }
  );
}

function replacePart(result, files) {
  const [file, nextFile] = files;
  const [name, ...ext] = file.name.split('.');
  if (file.isFile() && ext.at(-1) === 'html') {
    fs.readFile(
      path.join(__dirname, 'components', file.name),
      'utf8',
      function (error, data) {
        if (error) throw new Error('something got wrong8...');
        result = result.replace(`{{${name}}}`, data);

        fs.writeFile(
          path.resolve(__dirname, './project-dist', 'index.html'),
          result,
          (error) => {
            if (error) throw new Error('something got wrong9...');
            nextFile
              ? replacePart(result, files.slice(files.indexOf(file) + 1))
              : null;
          }
        );
      }
    );
  }
}
