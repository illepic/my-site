const React = require('react');
const Markdown = require('../../global/markdown');
const SiteHeader = require('../../organisms/site-header/site-header');
const SiteFooter = require('../../organisms/site-footer/site-footer');
const Meta = require('../../molecules/meta');
const Image = require('../../atoms/image');
const util = require('../../0-base/util');
const path = require('path');

const Default = class extends React.Component {
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

  componentDidUpdate() {
    this.newPage();
  }

  render() {
    const contents = this.props.children
      ? this.props.children
      : <Markdown contents={this.props.contents} />;
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
            {contents}
          </article>
        </main>

        <SiteFooter {...this.props} />

      </div>
    );
  }
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
  css: React.PropTypes.arrayOf(React.PropTypes.string),
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Default;
