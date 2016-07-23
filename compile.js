'use strict';
require('babel-register')({
  extensions: ['.jsx']
});
const renderReact = require('./renderReact');

if (process.argv[2]) {
  process.argv[2].split(',').forEach(file => {
    process.stdout.write(`Compiling ${file}...`);
    renderReact.compilePage(file);
  });
} else {
  process.stdout.write('Compiling Site...');
  renderReact.compileSite();
}
console.log('Done.');
