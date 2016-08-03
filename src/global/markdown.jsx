const React = require('react');
// const typeset = require('typeset');

const Markdown = (props) => {
  // const contents = (process.env.NODE_ENV === 'production')
  //   ? typeset(props.contents)
  //   : props.contents;
  const contents = props.contents;
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: contents }}></div>;
};

Markdown.propTypes = {
  contents: React.PropTypes.string,
};
module.exports = Markdown;
