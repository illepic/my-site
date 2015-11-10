/* 
  Isomorphic React renders twice. Once on the HTML page, once in JavaScript.
  If the props are the same on HTML and JavaScript, the template is synced,
  allowing subsequent updates without destroying user input:
  Modified from: http://www.crmarsh.com/react-ssr/
*/

var EntryTemplate = require('./post.jsx');
var React = require('react');
var he = require('he');

/*
  In an actual environment, this should be
  retrieved from a Store or some other database function.
*/
var props = JSON.parse(he.decode(document.getElementById('props').innerHTML));

// Render
var Entry = React.createFactory(EntryTemplate);

React.render(
  new Entry(props),
  document.getElementById('content')
);

