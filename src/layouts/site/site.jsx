const React = require('react');
// const Markdown = require('../../global/markdown');
const SiteHeader = require('../../organisms/site-header/site-header');
const SiteFooter = require('../../organisms/site-footer/site-footer');
const Meta = require('../../molecules/meta/meta');
const Image = require('../../atoms/image');
const Articles = require('./../../templates/articles/articles');
const BlogList = require('./../../templates/blog-list/blog-list');
const BlogPost = require('./../../templates/blog-post/blog-post');
const Default = require('./../../templates/default/default');
const Home = require('./../../templates/home/home');
const Notes = require('./../../templates/notes/notes');
const PortfolioItem = require('./../../templates/portfolio-item/portfolio-item');
const PortfolioList = require('./../../templates/portfolio-list/portfolio-list');
const Search = require('./../../templates/search/search');
// const Styleguide = require('./templates/styleguide');
const Utilities = require('./../../templates/utilities/utilities');
const util = require('../../0-base/util');
const path = require('path');

const Site = class extends React.Component {
  constructor(props) {
    super(props);
    this.newPage = this.newPage.bind(this);
  }

  newPage() {
    document.body.classList.remove('is-loading');

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // @todo only do this when going to a new page and trigger AFTER render
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.newPage();
  }

  componentDidUpdate(prevProps, prevState) {
    console.debug('componentDidUpdate', prevProps, prevState);
    this.newPage(prevProps);
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
      case 'articles':
        Template = Articles;
        break;
      case 'blog-list':
        Template = BlogList;
        break;
      case 'blog-post':
        Template = BlogPost;
        break;
      case 'home':
        Template = Home;
        break;
      case 'notes':
        Template = Notes;
        break;
      case 'portfolio-item':
        Template = PortfolioItem;
        break;
      case 'portfolio-list':
        Template = PortfolioList;
        break;
      case 'search':
        Template = Search;
        break;
      // case 'styleguide':
      //   Template = Styleguide;
      //   break;
      case 'utilities':
        Template = Utilities;
        break;
      default:
        Template = Default;
        break;
    }

    return (
      <div className="site container">
        {linkTags}
        <SiteHeader {...this.props} />
        <main className="site__main page">
          <header className="page__header">
            {this.props.title ? (<h2 className="page__title">{this.props.title}</h2>) : ''}
            <Meta {...this.props} className="page__meta" />
          </header>
          <article className="page__contents">
            {img}
            <Template {...this.props} />
          </article>
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
};

module.exports = Site;
