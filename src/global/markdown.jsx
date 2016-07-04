const React = require('react');

const Markdown = (props) => (
  <div className="markdown" dangerouslySetInnerHTML={{ __html: props.contents.toString() }}></div>
);

Markdown.propTypes = {
  contents: React.PropTypes.object,
};
module.exports = Markdown;
