const React = require('react');
const Markdown = require('../../global/markdown');
const SiteHeader = require('../../organisms/site-header/site-header');
const SiteFooter = require('../../organisms/site-footer/site-footer');
const Card = require('../../molecules/card/card');
const Meta = require('../../molecules/meta');
const Image = require('../../atoms/image');
const util = require('../../0-base/util');
const path = require('path');

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
  return (
    <div className="site container">
      {linkTags}
      <SiteHeader {...props} />
      <main className="site__main page">
        {props.title ? (<h2 className="page__title">{props.title}</h2>) : ''}
        <Meta {...props} />
        <article className="page__contents">
          {img}
          {contents}
        </article>
      </main>

      <section className="site__sidebar site__sidebar--first sidebar">
        <Card />
        <SiteFooter {...props} />
      </section>

    </div>
  );
};

Default.defaultProps = {
  subtitle: 'default subtitle',
};

Default.propTypes = {
  contents: React.PropTypes.object.isRequired,
  children: React.PropTypes.node,
  featuredImage: React.PropTypes.string,
  path: React.PropTypes.string,
  title: React.PropTypes.string,
  // css: React.PropTypes.array,
  css: React.PropTypes.arrayOf(React.PropTypes.string),
};

module.exports = Default;
