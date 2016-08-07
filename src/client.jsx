const React = require('react');
const ReactDOM = require('react-dom');
const join = require('path').join;
const history = require('../lib/history');
const Site = require('./layouts/site/site.jsx');

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app');
  let globalData = {};

  function getJsonData(pathname, cb) {
    const jsonPath = join(pathname, 'index.json');
    fetch(jsonPath).then(res => res.json()).then(pageData => {
      console.info('pageData', pageData);
      cb(null, pageData);
    });
  }

  function render() {
    getJsonData(history.getCurrentLocation().pathname, (err, data) => {
      ReactDOM.render(<Site {...data} site={globalData} />, appRoot);
    });
  }

  history.listen(render);

  // @todo run both `fetch`s in parallel using `Promise.all`
  fetch('/assets/data/global.json').then(res => res.json()).then(data => {
    console.info('globalData fetched', data);
    globalData = data;
    render();
  });
});
