'use strict';
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const glob = require('glob');
const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const Card = require('../../molecules/card/card');
const LandingList = require('../../organisms/landing-list/landing-list');

const Cards = (props) => {
  let allCards = glob.sync('src/molecules/card/examples/*.{yml,yaml}').map(example => {
    let name = path.basename(example, path.extname(example));
    let data = Object.assign({}, props.dummy, yaml.safeLoad(fs.readFileSync(example, 'utf8')));
    return (<div>
      <h5 style={{textTransform: 'capitalize'}}>{name}</h5>
      <Card {...data} />
    </div>);
  });
  return (<div>
    <h4>Cards</h4>
    {allCards}
    <hr />
  </div>);
};

const LandingLists = (props) => {
  let allLandingLists = glob.sync('src/organisms/landing-list/examples/*.{yml,yaml}').map(example => {
    let name = path.basename(example, path.extname(example));
    let data = Object.assign({}, props.dummy, yaml.safeLoad(fs.readFileSync(example, 'utf8')));
    return (<div>
      <h5 style={{textTransform: 'capitalize'}}>{name}</h5>
      <LandingList {...data} />
    </div>);
  });
  return (<div>
    <h4>LandingLists</h4>
    {allLandingLists}
    <hr />
  </div>);
};

const Styleguide = (props) => {
  return (
    <Default {...props}>
      <Markdown contents={props.contents}/>
      <Cards {...props} />
      <LandingLists {...props} />
    </Default>
  );
};

module.exports = Styleguide;
