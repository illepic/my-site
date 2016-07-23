const React = require('react');

const Markdown = (props) => (
  <div className="markdown" dangerouslySetInnerHTML={{ __html: props.contents }}></div>
);

Markdown.propTypes = {
  contents: React.PropTypes.string,
};
module.exports = Markdown;
