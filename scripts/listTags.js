const util = require('../src/0-base/util');
const globalData = require('../dist/assets/data/global.json');
const tags = util.getTags(globalData.pages);
console.log(tags);
