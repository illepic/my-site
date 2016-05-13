"use strict";
const React = require('react');
const ReactDomServer = require('react-dom/server');

module.exports = function(file) {
  let Template = require(file);
  return ReactDomServer.renderToStaticMarkup(<Template />);
};
