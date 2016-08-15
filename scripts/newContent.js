'use strict';
const yeoman = require('yeoman-generator');
const path = require('path');
const join = path.join;
const fs = require('fs-extra');
const fm = require('gray-matter');
const moment = require('moment');
const config = require('../config');

function slugify(string) {
  return string.replace(/ /g, '-').toLowerCase();
}

module.exports = yeoman.Base.extend({


  prompting: function () {

    const prompts = [{
      type: 'list',
      name: 'section',
      message: 'Where would you like this?',
      choices: fs.readdirSync(config.paths.content, 'utf8')
        .filter(item => fs.statSync(join(config.paths.content, item)).isDirectory()),
    }, {
      type: 'list',
      name: 'subFolder',
      message: 'Where in here?',
      when: answers => answers.section !== 'blog',
      choices: answers => {
        const folder = path.join(config.paths.content, answers.section);
        const subfolders = fs.readdirSync(folder, 'utf8')
          .filter(item => fs.statSync(join(folder, item)).isDirectory());
        return ['./'].concat(subfolders);
      },
    }, {
      name: 'date',
      message: 'Date?',
      when: answers => answers.section === 'blog',
      default: new Date().toISOString().substr(0, 10),
    }, {
      name: 'title',
      message: 'Title',
    }, {
      name: 'slug',
      message: 'What shall the slug be?',
      default: answers => slugify(answers.title),
      filter: slugify,
    }, {
      name: 'tags',
      message: 'Tags, comma separated, no spaces'
    }, {
      name: 'isOwnFolder',
      message: 'Place this in it\'s own folder?',
      type: 'confirm',
    }, {
      name: 'isMarkdown',
      message: 'Use Markdown?',
      type: 'confirm',
    }, {
      name: 'isDraft',
      message: 'Mark as a draft?',
      type: 'confirm',
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  },

  writing: function () {

    const destPathPieces = [
      config.paths.content,
      this.props.section,
    ];

    if (this.props.subFolder) destPathPieces.push(this.props.subFolder);

    if (this.props.date) {
      const [year, month] = this.props.date.split('-');
      destPathPieces.push(year, month);
    }

    if (this.props.isOwnFolder) {
      destPathPieces.push(this.props.slug);
      destPathPieces.push('index' + (this.props.isMarkdown ? '.md' : '.html'));
    } else {
      destPathPieces.push(this.props.slug + (this.props.isMarkdown ? '.md' : '.html'));
    }

    const destPath = path.join(...destPathPieces);

    const data = {
      title: this.props.title,
    };

    if (this.props.date) data.date = this.props.date;

    if (this.props.isDraft) data.draft = true;

    if (this.props.tags) data.tags = this.props.tags.split(',');

    // console.log(data);

    const content = fm.stringify('', data);

    // console.log('props:');
    // console.log(this.props);
    // console.log('destPath: ', destPath);
    // console.log('==============');
    // console.log(content);
    // console.log('==============');

    fs.mkdirsSync(path.parse(destPath).dir);
    fs.writeFileSync(destPath, content);

    console.log(`Written to ${destPath}`);
  }

});
