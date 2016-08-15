const glob = require('glob');
const config = require('../config');
const join = require('path').join;
const fs = require('fs');
const fm = require('gray-matter');

function alterSingleFile(file, cb) {
  fs.readFile(file, 'utf8', (err, contents) => {
    const fileData = fm(contents);
    // alter file data here
    const newContents = fm.stringify(fileData.content, fileData.data);
    fs.writeFile(file, newContents, (err2) => {
      if (err2) throw err2;
      if (typeof cb === 'function') {
        cb();
      }
    });
  });
}

if (process.argv[2]) {
  alterSingleFile(process.argv[2], () => {
    console.log(`done with: ${process.argv[2]}`);
  });
} else {
  const files = glob.sync(join(config.paths.content, '/**/*.{md,html}'));
  files.forEach(file => {
    alterSingleFile(file);
  });
}
