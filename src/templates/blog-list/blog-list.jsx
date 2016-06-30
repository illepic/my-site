'use strict';
const React = require('react');
const Default = require('../default/default');
const Card = require('../../molecules/card/card');
const Markdown = require('../../global/markdown');
const Meta = require('../../molecules/meta');

const BlogList = (props) => {
  let blogList = props.pagination.files.map(post=> {
    return (
      <Card 
        {...post}
        path={(post.title_url ? post.title_url : post.path)} 
        key={post.path} 
      >
        <Meta {...post} />
        {post.excerpt ? (<div className="card__excerpt" dangerouslySetInnerHTML={{__html: post.excerpt}}></div>) : ''}
      </Card>
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
        {props.pagination.previous ? (<a href={ '/' + props.pagination.previous.path.replace('index.html', '') } className="pager__link pager__link--prev button">Previous</a>) : null}
        {props.pagination.next ? (<a href={ '/' + props.pagination.next.path.replace('index.html', '') } className="pager__link pager__link--next button">Next</a>) : null}
      </nav>
      
    </Default>
  );
};

module.exports = BlogList;
