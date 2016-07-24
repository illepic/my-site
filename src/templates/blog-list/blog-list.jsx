const React = require('react');
const Default = require('../default/default');
const Card = require('../../molecules/card/card');
const Markdown = require('../../global/markdown');
const Meta = require('../../molecules/meta');

const BlogList = (props) => {
  const blogList = props.site.pages
  .filter(page => page.section === 'blog' && !page.landingPage)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(post => (
    <Card
      {...post}
      path={post.path}
      key={post.path}
    >
      <Meta {...post} />
      {post.excerpt ?
        (<div className="card__excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>)
        : ''}
    </Card>
  ));
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
};

module.exports = BlogList;
