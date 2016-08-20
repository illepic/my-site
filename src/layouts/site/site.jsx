const React = require('react');
const Markdown = require('../../global/markdown');
const SiteHeader = require('../../organisms/site-header/site-header');
const SiteFooter = require('../../organisms/site-footer/site-footer');
const Branding = require('../../molecules/branding');
const Meta = require('../../molecules/meta/meta');
const Image = require('../../atoms/image');
const Home = require('./../../templates/home/home');
const PortfolioItem = require('./../../templates/portfolio-item/portfolio-item');
const LandingList = require('../../organisms/landing-list/landing-list');
const Search = require('./../../templates/search/search');
const util = require('../../0-base/util');
const path = require('path');

const Site = class extends React.Component {
  constructor(props) {
    super(props);
    this.newPage = this.newPage.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.updateHead = this.updateHead.bind(this);
    this.updateAnalytics = this.updateAnalytics.bind(this);
  }

  updateComments() {
    window.DISQUS.reset({
      reload: true,
      config: function configDisqus() {
        this.page.identifier = this.props.path;
        this.page.url = window.location.origin + this.props.path;
        this.page.title = this.props.title;
        this.language = 'en';
      },
    });
  }

  updateHead() {
    document.title = util.docTitle(this.props);
  }

  updateAnalytics() {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
    window.ga('set', 'page', this.props.path);
    window.ga('send', 'pageview');
  }

  newPage() {
    const Clipboard = require('clipboard');
    this.clipboard = new Clipboard('.code-btn', {
      target: trigger => trigger.nextElementSibling,
    });
  }

  componentWillReceiveProps() {
    this.clipboard.destroy();
  }

  componentDidMount() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
    this.newPage();
  }

  componentDidUpdate(prevProps) {
    document.body.classList.remove('is-loading');
    if (prevProps.path !== this.props.path && !window.location.hash) {
      // @todo only do this when going to a new page and trigger AFTER render
      window.scrollTo(0, 0);
    }

    this.updateHead();

    if (window.location.hostname === 'www.evanlovely.com') {
      if (this.props.comments || !this.props.draft) {
        this.updateComments();
      }
    }

    if (window.location.hostname === 'www.evanlovely.com') {
      // this is set on my browsers to ensure I don't trigger pageviews on prod
      if (!(JSON.parse(localStorage.getItem('doNotTrack')))) {
        this.updateAnalytics();
      }
    }

    this.newPage();
  }

  render() {
    const linkTags = (this.props.css ? this.props.css.map(css => (
      <link rel="stylesheet" href={css} key={css} />)
    ) : '');
    let img = null;
    if (this.props.featuredImage) {
      let myPath = (
        util.isPathRootRelative(this.props.featuredImage) ||
        util.isPathRemote(this.props.featuredImage)
      ) ? this.props.featuredImage
        : path.join(this.props.path, this.props.featuredImage);
      img = <Image src={myPath} className="featuredImage" />;
    }

    let Template;
    switch (this.props.template) {
      case 'home':
        Template = Home;
        break;
      case 'portfolio-item':
        Template = PortfolioItem;
        break;
      case 'search':
        Template = Search;
        break;
      default:
        Template = null;
        break;
    }

    let content;
    if (Template) {
      content = <Template {...this.props} />;
    } else if (this.props.landingPage) {
      let landingListItems = this.props.site.pages
        .filter(page => !page.landingPage && page.section === this.props.section);
      landingListItems = (this.props.section === 'blog')
        ? landingListItems
            .sort(util.sortByDate)
            .slice(0, 20) // @todo add pagination for Blog
        : landingListItems.sort(util.sortByWeight);
      content = (<LandingList
        {...this.props}
        items={landingListItems}
      />);
    }

    return (
      <div className="site container">
        {linkTags}
        <input type="checkbox" id="site-nav-toggle" className="site-header-toggle hidden" />
        <label htmlFor="site-nav-toggle" className="site__nav-toggle nav-toggle"></label>
        <SiteHeader {...this.props} />
        <main className="site__main page">
          <Branding {...this.props} />
          <header className="page__header">
            {this.props.title ? (<h2 className="page__title">{this.props.title}</h2>) : ''}
            <Meta {...this.props} className="page__meta" />
          </header>
          <article className="page__contents">
            {img}
            <Markdown contents={this.props.contents} />
            {content}
          </article>
          <div
            id="disqus_thread"
            className={!this.props.comments || this.props.draft ? 'hidden' : 'comments'}
          ></div>
        </main>

        <SiteFooter {...this.props} />
      </div>
    );
  }
};

Site.propTypes = {
  css: React.PropTypes.arrayOf(React.PropTypes.string),
  featuredImage: React.PropTypes.string,
  path: React.PropTypes.string,
  title: React.PropTypes.string,
  template: React.PropTypes.string,
  contents: React.PropTypes.string,
  section: React.PropTypes.string,
  draft: React.PropTypes.bool,
  landingPage: React.PropTypes.bool,
  comments: React.PropTypes.bool,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Site;
