const React = require('react');
const LinksCard = require('../../molecules/links-card');

const SiteFooter = (props) => {
  const items = props.site.pages
  .filter(item => item.nav === 'footer')
  .sort((a, b) => a.weight > b.weight)
  .map(item => (<a href={item.path} key={item.path} className="footer-nav__link">{item.title}</a>));

  const postCount = 6;
  let footerBlockCount = 1;
  let relatedPosts;
  let relatedPages;
  if (props.tags) {
    const related = props.site.pages
    .filter(page => page.tags && page.tags.some(
      relatedTag => props.tags.some(
        thisTag => thisTag === relatedTag)
      )
    );
    relatedPosts = (<LinksCard
      title="Related Posts"
      links={related.filter(x => x.section === 'blog')}
      className="footer-blocks__block"
    />);
    relatedPages = (<LinksCard
      title="Related Pages"
      links={related.filter(x => x.section !== 'blog')}
      className="footer-blocks__block"
    />);
  }

  const recentBlogPosts = props.site.pages
  .filter(page => page.section === 'blog' && !page.landingPage)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, postCount);

  if (relatedPages && relatedPosts) {
    footerBlockCount = 3;
  } else if (relatedPages || relatedPosts) {
    footerBlockCount = 2;
  }

  return (
    <footer className="site__footer">
      <section className={`footer-blocks footer-blocks--has-${footerBlockCount}`}>
        {relatedPosts}
        {relatedPages}
        <LinksCard
          title="Recent Blog Posts"
          links={recentBlogPosts}
          className="footer-blocks__block"
        />
      </section>
      <nav className="footer-nav">
        {items}
      </nav>
    </footer>
  );
};

SiteFooter.propTypes = {
  tags: React.PropTypes.array,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = SiteFooter;
