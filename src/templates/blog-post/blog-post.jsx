const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');

const BlogPost = (props) => {
  let pager;
  if (props.previous || props.next) {
    pager = (<nav className="pager">
      {props.previous ? (
        <a
          href={props.previous.path}
          className="pager__link pager__link--prev"
        >Previous - {props.previous.title}</a>
      ) : ''}
      {props.next ? (
        <a
          href={props.next.path}
          className="pager__link pager__link--next"
        >Next - {props.next.title}</a>
      ) : ''}
    </nav>);
  }
  return (
    <Default {...props}>
      <Markdown contents={props.contents} />
      {pager}
    </Default>
  );
};

BlogPost.propTypes = {
  previous: React.PropTypes.object,
  next: React.PropTypes.object,
  contents: React.PropTypes.object.isRequired,
};

module.exports = BlogPost;
