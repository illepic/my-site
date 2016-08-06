const React = require('react');
const Card = require('../../molecules/card/card');
const Meta = require('../../molecules/meta');

const LandingList = (props) => {
  const list = props.items.map(item => {
    let contents = '';
    if (item.excerpt) {
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
      className="landing-list__item"
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

LandingList.propTypes = {
  items: React.PropTypes.array.isRequired,
  landingListRows: React.PropTypes.bool,
  section: React.PropTypes.string,
};

module.exports = LandingList;
