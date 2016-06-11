"use strict";
const React = require('react');
const ReactDomServer = require('react-dom/server');
const typeset = require('typeset');

module.exports = function(file, props) {
  let Template = require(file);
  props = props || {};
  return typeset(ReactDomServer.renderToStaticMarkup(<Template {...props} />));
};
