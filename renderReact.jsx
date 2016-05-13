"use strict";
const React = require('react');
const ReactDomServer = require('react-dom/server');

module.exports = function(file, props) {
  let Template = require(file);
  props = props || {};
  return ReactDomServer.renderToStaticMarkup(<Template {...props} />);
};
