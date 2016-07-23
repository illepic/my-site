'use strict';
require('babel-register')({
  extensions: ['.jsx']
});
const renderReact = require('./renderReact');

if (process.argv[2]) {
  process.argv[2].split(',').forEach(file => {
    console.log(`Compiling ${file}...`);
    renderReact.compilePage(file);
  });
} else {
  console.log('Compiling Site...');
  renderReact.compileSite();
}
console.log('Done');
