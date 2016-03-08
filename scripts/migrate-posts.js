#!/usr/bin/env node
'use strict';
const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

let dir = './content/posts';

fs.readdirSync(dir).filter(item => !fs.statSync(path.join(dir,item)).isDirectory()).forEach((file) => {
  //let fileData = matter.read(path.join(dir, file));
  //let contents = fileData.content.concat();
  //delete fileData.content;
  let date = file.substring(0,11);
  let year = file.substring(0,4);
  let month = file.substring(5,7);
  fs.ensureDirSync(path.join(dir, year, month));
  fs.renameSync(path.join(dir, file), path.join(dir, year, month, file.replace(date, '')));
  let x = true;
  //fileData.data.date = date;
  //fs.writeFileSync(path.join(dir, file), matter.stringify(contents, fileData.data));
});
