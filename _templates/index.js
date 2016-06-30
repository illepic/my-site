'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var plBase = ('./src');

module.exports = yeoman.Base.extend({
  prompting: function () {

    console.log('Hi! This will help you build a component folder with assets.');
    console.log('Templates for this are in: ' + path.relative(process.cwd(), __dirname));
    console.log('');

    var prompts = [{
      type: 'list',
      name: 'componentType',
      message: 'Where would you like this new component?',
      choices: fs.readdirSync(plBase, 'utf8')
    }, {
      type: 'list',
      name: 'componentSubType',
      message: 'Where in here?',
      choices: function(answers) {
        var folder = path.join(plBase, answers.componentType);
        var subfolders = fs.readdirSync(folder, 'utf8');
        return ['./'].concat(subfolders);
      }
    }, {
      name: 'name',
      message: 'What shall we name it?',
      filter: function(answer) {
        return answer.replace(/ /g, '-').toLowerCase();
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    // console.log(this.props);
    var destPath = path.join(plBase, this.props.componentType, this.props.componentSubType, this.props.name);

    this.fs.copyTpl(
      this.templatePath('_component.scss'),
      this.destinationPath(path.join(destPath, '_' + this.props.name + '.scss')),
      this.props
    );
  
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(path.join(destPath, 'package.json')),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('component.jsx'),
      this.destinationPath(path.join(destPath, this.props.name + '.jsx')),
      this.props
    );

  }

});
