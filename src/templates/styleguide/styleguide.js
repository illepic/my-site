'use strict';
const iframifyComponent = require('./iframifyComponents');

document.addEventListener('fontsLoaded', function () {

  let cards = [{
    selector: '.cards__full .card',
    sizes: ['400px']
  }, {
    selector: '.cards__minimal .card',
    sizes: ['400px']
  }];
  iframifyComponent(cards);

});
