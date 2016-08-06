const React = require('react');
const LinksCard = require('../../molecules/links-card');
const Link = require('../../atoms/link');

const SiteFooter = (props) => {
  const items = props.site.pages
  .filter(item => item.nav === 'footer')
  .sort((a, b) => a.weight > b.weight)
  .map(item => (<Link
    href={item.path}
    key={item.path}
    className="footer-nav__link"
  >{item.title}</Link>));

  const postCount = 6;
  let footerBlockCount = 1;
  // let relatedPosts;
  let relatedPages;
  if (props.tags) {
    const related = props.site.pages
      .filter(page => page.tags
        && page.path !== props.path // not page we are on
        && page.tags.some(
        relatedTag => props.tags.some(
          thisTag => thisTag === relatedTag)
        )
      )
      .sort((a, b) => {
        // blog below others
        if (a.section === 'blog' && b.section !== 'blog') {
          return 1;
        }
        // non-blog sorted by weight
        if (a.section !== 'blog' && b.section !== 'blog') {
          return a.weight > b.weight;
        }
        return 0;
      });
    // relatedPosts = (<LinksCard
    //   title="Related Posts"
    //   links={related.filter(x => x.section === 'blog')}
    //   className="footer-blocks__block"
    // />);
    relatedPages = (related.length !== 0) ? (<LinksCard
      title="Related"
      links={related}
      className="footer-blocks__block"
      showSection
    />) : null;
  }

  const recentBlogPosts = props.site.pages
  .filter(page => page.section === 'blog' && !page.landingPage)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, postCount);

  if (relatedPages) {
    footerBlockCount = 2;
  }

  return (
    <footer className="site__footer">
      <section className={`footer-blocks footer-blocks--has-${footerBlockCount}`}>
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
  path: React.PropTypes.string,
};

module.exports = SiteFooter;
