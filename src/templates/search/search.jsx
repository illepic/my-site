const React = require('react');
const url = require('url');
const querystring = require('querystring');
const Link = require('../../atoms/link');

const Search = class extends React.Component {
  constructor(props) {
    super(props);
    this.getQuery = this.getQuery.bind(this);
    this.handleTagsForm = this.handleTagsForm.bind(this);
    this.handleTitleForm = this.handleTitleForm.bind(this);
    this.state = {
      tags: '',
      title: '',
    };
  }
  handleTagsForm(event) {
    this.setState({
      tags: event.target.value,
    });
  }
  handleTitleForm(event) {
    this.setState({
      title: event.target.value,
    });
  }
  getQuery() {
    const query = url.parse(window.location.href).query;
    const x = querystring.parse(query);
    if (x.tags || x.title) {
      this.setState(x);
    }
  }
  componentDidMount() {
    this.getQuery();
  }
  render() {
    const pages = this.props.site.pages
      .filter(page => page.tags && page.tags.some(tag =>
        tag.toLowerCase().startsWith(this.state.tags.toLowerCase()))
      )
      .filter(page => {
        if (!this.state.title) return true;
        if (!page.title) return false;
        const x = new RegExp(this.state.title, 'i');
        return x.test(page.title);
      })
      .map(page => <li key={page.path}>
        <Link href={page.path}>{page.title}</Link> - {page.tags.join(', ')}
      </li>);
    return (
      <div className="search">
        <label>Title: </label>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleTitleForm}
        />
        <label>Tag: </label>
        <input
          type="text"
          value={this.state.tags}
          onChange={this.handleTagsForm}
        />
        <ul>{pages}</ul>
      </div>
    );
  }
};

Search.propTypes = {
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Search;
