const React = require('react');
const Markdown = require('../../global/markdown');
const SiteHeader = require('../../organisms/site-header/site-header');
const SiteFooter = require('../../organisms/site-footer/site-footer');
const Meta = require('../../molecules/meta');
const Image = require('../../atoms/image');
const util = require('../../0-base/util');
const path = require('path');
const LinksCard = require('../../molecules/links-card');

const Default = (props) => {
  let contents = (props.children ? props.children : <Markdown contents={props.contents} />);
  let linkTags = (props.css ? props.css.map(css => (
    <link rel="stylesheet" href={css} key={css} />)
  ) : '');
  let img = null;
  if (props.featuredImage) {
    let myPath = (
      util.isPathRootRelative(props.featuredImage) ||
      util.isPathRemote(props.featuredImage)
    ) ? props.featuredImage
      : path.join(props.path, props.featuredImage);
    img = <Image src={myPath} />;
  }

  let relatedPosts;
  if (props.tags) {
    const related = props.site.pages
    .filter(page => page.tags && page.tags.some(
      relatedTag => props.tags.some(
        thisTag => thisTag === relatedTag)
      )
    );
    relatedPosts = <LinksCard title="Related" links={related} />;
  }

  const recentBlogPosts = props.site.pages
  .filter(page => page.section === 'blog' && !page.landingPage)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 5);

  return (
    <div className="site container">
      {linkTags}
      <SiteHeader {...props} />
      <main className="site__main page">
        <header className="page__header">
          {props.title ? (<h2 className="page__title">{props.title}</h2>) : ''}
          <Meta {...props} className="page__meta" />
        </header>
        <article className="page__contents">
          {img}
          {contents}
        </article>
      </main>

      <section className="site__sidebar site__sidebar--first sidebar">
        {relatedPosts}
        <LinksCard title="Recent Blog Posts" links={recentBlogPosts} />
        <SiteFooter {...props} />
      </section>

    </div>
  );
};

Default.defaultProps = {
  subtitle: 'default subtitle',
};

Default.propTypes = {
  contents: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
  featuredImage: React.PropTypes.string,
  path: React.PropTypes.string,
  title: React.PropTypes.string,
  tags: React.PropTypes.array,
  css: React.PropTypes.arrayOf(React.PropTypes.string),
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Default;
