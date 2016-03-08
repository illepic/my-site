#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

let dir = './content/posts';

fs.readdirSync(dir).forEach((file) => {
  let fileData = matter.read(path.join(dir, file));
  let contents = fileData.content.concat();
  delete fileData.content;
  let date = file.substring(0,10);
  fileData.data.date = date;
  fs.writeFileSync(path.join(dir, file), matter.stringify(contents, fileData.data));
});
