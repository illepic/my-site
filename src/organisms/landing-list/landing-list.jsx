const React = require('react');
const Card = require('../../molecules/card/card');

const LandingList = (props) => {
  let list = props.items.map((item, i) => (
    <aside className="landing-list__item" key={i}>
      <Card {...item}>
        {item.excerpt ?
          (<p className="card__excerpt" dangerouslySetInnerHTML={{ __html: item.excerpt }}></p>)
          : null}
      </Card>
    </aside>
  ));
  return (
    <section className="landing-list smart-grid" data-row-items-small="2" data-row-items-large="3">
      {list}
    </section>
  );
};

LandingList.propTypes = {
  items: React.PropTypes.array.isRequired,
};

module.exports = LandingList;
