const React = require('react');
const Default = require('../default/default');
const Card = require('../../molecules/card/card');
const Markdown = require('../../global/markdown');
const Meta = require('../../molecules/meta');
// const typeset = require('typeset');

const BlogList = (props) => {
  const blogList = props.site.pages
  .filter(page => page.section === 'blog' && !page.landingPage)
  .map(post => {
    let contents = '';
    if (post.excerpt) {
      // const excerpt = (process.env.NODE_ENV === 'production')
      //   ? typeset(post.excerpt)
      //   : post.excerpt;
      const excerpt = post.excerpt;
      contents = (<div
        className="card__excerpt"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      ></div>);
    }
    return (<Card
      {...post}
      path={post.path}
      key={post.path}
    >
      <Meta {...post} />
      {contents}
    </Card>);
  });
  return (
    <Default {...props} title="Blog">
      <Markdown contents={props.contents} />
      <section className="blog-list">
        {blogList}
      </section>
    </Default>
  );
};

/*
<nav className="pager">
  {props.pagination.previous ?
    (<a
      href={`/${props.pagination.previous.path.replace('index.html', '')}`}
      className="pager__link pager__link--prev button"
    >
      Previous
    </a>)
    : null}
  {props.pagination.next ?
    (<a
      href={`/${props.pagination.next.path.replace('index.html', '')}`}
      className="pager__link pager__link--next button"
    >
      Next
    </a>)
    : null}
</nav>
*/

BlogList.propTypes = {
  pagination: React.PropTypes.shape({
    files: React.PropTypes.array.isRequired,
    previous: React.PropTypes.object,
    next: React.PropTypes.object,
  }),
  contents: React.PropTypes.string.isRequired,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = BlogList;
