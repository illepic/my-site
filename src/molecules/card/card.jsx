'use strict';
const React = require('react');

const Card = (props) => {
  return (
    <article className="card">
      <h5 className="card__title"><a href={ props.path }>{ props.title }</a></h5>
      {props.children ? (<div className="card__contents">{props.children}</div>) : ''}
      <a href={props.path} className="button">Read More</a>
    </article>
  );
};

Card.defaultProps = {
  title: 'default title',
  path: '#'
};

module.exports = Card;
