'use strict';
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const glob = require('glob');
const React = require('react');
const Default = require('../default/default');
const Date = require('../../atoms/date');
const Markdown = require('../../global/markdown');
const Card = require('../../molecules/card/card');
const LandingList = require('../../organisms/landing-list/landing-list');

const Cards = (props) => {
  let allCards = glob.sync('src/molecules/card/examples/*.{yml,yaml}').map(example => {
    let name = path.basename(example, path.extname(example));
    let data = Object.assign({}, props.dummy, yaml.safeLoad(fs.readFileSync(example, 'utf8')));
    return (<div key={name} className={'cards__' + name}>
      <h5 style={{textTransform: 'capitalize'}}>{name}</h5>
      <Card {...data}>
        {data.excerpt}
      </Card>
    </div>);
  });
  return (<div className="styleguide--cards">
    <h4 id="cards">Cards</h4>
    {allCards}
    <hr />
  </div>);
};

const LandingLists = (props) => {
  let allLandingLists = glob.sync('src/organisms/landing-list/examples/*.{yml,yaml}').map(example => {
    let name = path.basename(example, path.extname(example));
    let data = Object.assign({}, props.dummy, yaml.safeLoad(fs.readFileSync(example, 'utf8')));
    return (<div key={name}>
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
        <li><a href="#metadata">Metadata</a></li>
        <li><a href="#buttons">Buttons</a></li>
        <li><a href="#forms">Forms</a></li>
        <li><a href="#cards">Cards</a></li>
        <li><a href="#landing-lists">Landing Lists</a></li>
      </ul>
      <h4 id="typography">Typography</h4>
      <Markdown contents={props.contents}/>
      <h4 id="metadata">Metadata</h4>
      <h5>Date</h5>
      <Date date="2015-12-25" />
      <br />
      <Date date="2015-1-2" /> 
      <Cards {...props} />
      <LandingLists {...props} />
      <script src="/assets/bundle--styleguide.js"></script>
    </Default>
  );
};

module.exports = Styleguide;
