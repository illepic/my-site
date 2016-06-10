'use strict';
const React = require('react');

const Card = (props) => {
  return (
    <article className="card">
      <h3 className="card__title"><a href={ props.path }>{props.title }</a></h3>
    </article>
  );
};

module.exports = Card;
