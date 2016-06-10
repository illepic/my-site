'use strict';
const React = require('react');

const Markdown = (props) => (<div className="markdown" dangerouslySetInnerHTML={{__html: props.contents.toString()}}></div> );

module.exports = Markdown;
