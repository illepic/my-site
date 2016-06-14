'use strict';
const React = require('react');
const Default = require('../default/default');
const Card = require('../../molecules/card/card');
const Markdown = require('../../global/markdown');
const Date = require('../../atoms/date');

const BlogList = (props) => {
  let blogList = props.pagination.files.map(post=> {
    let url = (post.title_url ? post.title_url : post.path);
    let excerpt = <Date date={post.date} />;
    return (
      <Card 
        title={post.title} 
        path={url} 
        excerpt={excerpt} 
        key={post.path} 
      />
    );
  });
  return (
    <Default {...props} title="Blog">
      <Markdown contents={props.contents} />
      <section>
        {blogList}
      </section>
      <hr />
      <nav className="pager">
        {props.pagination.previous ? (<a href={ '/' + props.pagination.previous.path.replace('index.html', '') } className="pager__link pager__link--prev">Previous</a>) : null}
        {props.pagination.next ? (<a href={ '/' + props.pagination.next.path.replace('index.html', '') } className="pager__link pager__link--next">Next</a>) : null}
      </nav>
      
    </Default>
  );
};

module.exports = BlogList;
