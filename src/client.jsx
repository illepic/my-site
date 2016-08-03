const React = require('react');
const ReactDOM = require('react-dom');
const join = require('path').join;
const history = require('../lib/history');
const Articles = require('./templates/articles');
const BlogList = require('./templates/blog-list');
const BlogPost = require('./templates/blog-post');
const Default = require('./templates/default');
const Home = require('./templates/home');
const Notes = require('./templates/notes');
const PortfolioItem = require('./templates/portfolio-item');
const PortfolioList = require('./templates/portfolio-list');
const Search = require('./templates/search');
// const Styleguide = require('./templates/styleguide');
const Utilities = require('./templates/utilities');

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app');

  function onNewPage() {
    const elements = document.querySelectorAll('pre code');
    Array.prototype.forEach.call(elements, el => {
      window.hljs.highlightBlock(el);
    });
  }

  function getJsonData(pathname, cb) {
    fetch('/assets/data/global.json').then(res => res.json()).then(globalData => {
      const jsonPath = join(pathname, 'index.json');
      fetch(jsonPath).then(res => res.json()).then(pageData => {
        console.log('pageData', pageData);
        const data = pageData;
        data.site = globalData;
        cb(null, data);
      });
    });
  }

  function render() {
    getJsonData(history.getCurrentLocation().pathname, (err, data) => {
      let Template;
      switch (data.template) {
        case 'articles':
          Template = Articles;
          break;
        case 'blog-list':
          Template = BlogList;
          break;
        case 'blog-post':
          Template = BlogPost;
          break;
        case 'home':
          Template = Home;
          break;
        case 'notes':
          Template = Notes;
          break;
        case 'portfolio-item':
          Template = PortfolioItem;
          break;
        case 'portfolio-list':
          Template = PortfolioList;
          break;
        case 'search':
          Template = Search;
          break;
        // case 'styleguide':
        //   Template = Styleguide;
        //   break;
        case 'utilities':
          Template = Utilities;
          break;
        default:
          Template = Default;
          break;
      }

      ReactDOM.render(<Template {...data} />, appRoot);

      onNewPage();
    });
  }

  history.listen(() => {
    render();
  });

  render();
});
