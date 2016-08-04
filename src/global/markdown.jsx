const React = require('react');
// const typeset = require('typeset');

const Markdown = class extends React.Component {
  // const contents = (process.env.NODE_ENV === 'production')
  //   ? typeset(props.contents)
  //   : props.contents;
  constructor(props) {
    super(props);
    this.newPage = this.newPage.bind(this);
  }

  newPage() {
    const elements = document.querySelectorAll('pre code');
    Array.prototype.forEach.call(elements, el => {
      window.hljs.highlightBlock(el);
    });
  }

  componentDidMount() {
    this.newPage();
  }

  componentDidUpdate() {
    this.newPage();
  }

  render() {
    const contents = this.props.contents;
    return <div className="markdown" dangerouslySetInnerHTML={{ __html: contents }}></div>;
  }
};

Markdown.propTypes = {
  contents: React.PropTypes.string,
};

module.exports = Markdown;
