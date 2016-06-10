'use strict';
const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const Date = require('../../atoms/date');

const Blog = (props) => {
  let blogList = props.pagination.files.map(post=> {
    return (<p key={post.path}><Date date={post.date} /> - <a href={ post.path }>{ post.title }</a></p>);
  });
  return (
    <Default {...props} title="Blog">
      <Markdown contents={props.contents} />
      <section>
        {blogList}
      </section>
      <hr />
      <nav className="pager">
        {props.pagination.previous ? (<a href={ props.pagination.previous.path } className="pager__link pager__link--prev">Previous</a>) : null}
        {props.pagination.next ? (<a href={ props.pagination.next.path } className="pager__link pager__link--next">Next</a>) : null}
      </nav>
      
    </Default>
  );
};

module.exports = Blog;
