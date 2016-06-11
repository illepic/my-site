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
    <h4 id="cards">Cards</h4>
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
    <h4 id="landing-lists">LandingLists</h4>
    {allLandingLists}
    <hr />
  </div>);
};

const Styleguide = (props) => {
  return (
    <Default {...props}>
      <ul className="toc">
        <li><a href="#typography">Typography</a></li>
        <li><a href="#buttons">Buttons</a></li>
        <li><a href="#forms">Forms</a></li>
        <li><a href="#cards">Cards</a></li>
        <li><a href="#landing-lists">Landing Lists</a></li>
      </ul>
      <h4 id="typography">Typography</h4>
      <Markdown contents={props.contents}/>
      <Cards {...props} />
      <LandingLists {...props} />
    </Default>
  );
};

module.exports = Styleguide;
