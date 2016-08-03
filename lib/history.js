const createHistory = require('history').createHistory;
const history = createHistory();
history.listenBefore((location) => {
  window.scrollTo(0,0);
});
module.exports = history;
