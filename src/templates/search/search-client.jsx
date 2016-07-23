'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const util = require('../../0-base/util');
const Search = require(__dirname + '/search.jsx');

document.addEventListener('DOMContentLoaded', () => {
  
  console.log('ready to go');
  util.getJsonData((err, data) => {
    if (err) {
      console.log('uh oh');
    } else {
      console.log('got data, rendering react component...', data);
      ReactDOM.render(<Search {...data} />, document.getElementById('app'));
    }
  });

});
