'use strict';
const React = require('react');

const Card = (props) => {
  return (
    <article className="card">
      <h3 className="card__title"><a href={ props.path }>{ props.title }</a></h3>
      {props.excerpt ? (<div className="card__excerpt">{ props.excerpt}</div>) : ''}
      <a href={props.path} className="button">Read More</a>
    </article>
  );
};

Card.defaultProps = {
  title: 'default title',
  path: '#'
};

module.exports = Card;
