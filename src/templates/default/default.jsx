"use strict";
const React = require('react');
const Markdown = require('../../global/markdown');
const SiteHeader = require('../../organisms/site-header/site-header');
const SiteFooter = require('../../organisms/site-footer/site-footer');

const Default = (props) => {
  let contents = (props.children ? props.children : <Markdown contents={props.contents} />);
  
  return (
    <div className="container">
      <SiteHeader {...props} />
      <main className="site__main page">
        {props.title ? (<h2 className="page__title">{props.title}</h2>) : ''}
        <article className="page__contents">
          {contents}
        </article>
      </main>
      
      <section className="site__sidebar site__sidebar--first sidebar">

      </section>
      
      <section className="site__sidebar site__sidebar--second sidebar">

      </section>
      
      <SiteFooter {...props} />
    </div>
  );
};

Default.defaultProps = {
  subtitle: 'default subtitle'
};

module.exports = Default;
