const path = require('path');
const fs = require('fs-extra');
const file = process.argv[2];

const info = path.parse(file);
const newDir = path.join(info.dir, info.name);
fs.mkdirSync(newDir);
fs.move(file, path.join(newDir, `index${info.ext}`), err => {
  if (err) return console.error(err);
  console.log('done');
});
