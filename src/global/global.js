const util = require('../0-base/util');

document.addEventListener('DOMContentLoaded', () => {
  util.getJsonData((err, data) => {
    if (!err) {
      console.log('page data', data);
    }
  });
});
