const React = require('react');
const Card = require('../../molecules/card/card');
const Meta = require('../../molecules/meta');

const LandingList = (props) => {
  const items = [];

  for (let i = 1; i < 11; i++) {
    props.items
      .filter(item => item.weight === i)
      .forEach(item => items.push(item));
  }

  const list = items.map(item => {
    let contents = '';
    if (props.showExcerpts && item.excerpt) {
      const excerpt = item.excerpt;
      contents = (<div
        className="card__excerpt"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      ></div>);
    }
    return (<Card
      {...item}
      path={item.path}
      key={item.path}
      className={contents
        ? 'landing-list__item'
        : 'landing-list__item landing-list__item--excerptless'}
    >
      <Meta {...item} />
      {contents}
    </Card>);
  });
  const isGrid = !props.landingListRows;
  const classList = [
    'landing-list',
    `landing-list--${props.section}`,
  ];
  if (isGrid) classList.push('smart-grid');
  return (
    <section className={classList.join(' ')} data-row-items-small="2" data-row-items-large="3">
      {list}
    </section>
  );
};

LandingList.defaultProps = {
  showExcerpts: true,
};

LandingList.propTypes = {
  items: React.PropTypes.array.isRequired,
  landingListRows: React.PropTypes.bool,
  section: React.PropTypes.string,
  showExcerpts: React.PropTypes.bool,
};

module.exports = LandingList;
