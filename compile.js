'use strict';
require('babel-register')({
  extensions: ['.jsx']
});
const renderReact = require('./renderReact');

if (process.argv[2]) {
  console.log(`Compiling ${process.argv[2]}...`);
  renderReact.compilePage(process.argv[2]);
} else {
  console.log('Compiling Site...');
  renderReact.compileSite();
}
console.log('Done');
