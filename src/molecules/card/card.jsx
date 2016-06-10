'use strict';
const React = require('react');

const Card = (props) => {
  return (
    <article className="card">
      <h3 className="card__title"><a href={ props.path }>{props.title }</a></h3>
      {props.excerpt ? (<div className="card__excerpt">{props.excerpt}</div>) : ''}
    </article>
  );
};

module.exports = Card;
