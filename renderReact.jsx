"use strict";
const React = require('react');
const render = require('react-dom/server').renderToStaticMarkup;
const typeset = require('typeset');

module.exports = function(file, props) {
  let Tpl = require(file);
  props = props || {};
  return (process.env.NODE_ENV === 'production') ? typeset(render(<Tpl {...props} />)) : render(<Tpl {...props} />);
};
