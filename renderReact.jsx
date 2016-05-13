const React = require('react');
const ReactDomServer = require('react-dom/server');
const Test = require('./test.jsx');

module.exports = ReactDomServer.renderToStaticMarkup(<Test />);
