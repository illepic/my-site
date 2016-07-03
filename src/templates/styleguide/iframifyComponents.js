'use strict';

module.exports = function (components) {
  require('iframify');
  const iframify = window.iframify;
  let bodyClasses = document.querySelector('body').getAttribute('class');

  Array.prototype.forEach.call(components, function (component) {
    let el = document.querySelector(component.selector);
    Array.prototype.forEach.call(component.sizes, function (size) {

      let newEl = document.createElement('div');
      newEl.appendChild(el.cloneNode(true));
      let el2 = el.insertAdjacentElement('afterend', newEl);
      let iframe = iframify(el2, {
        bodyAttr: {
          class: bodyClasses,
        },
      });
      iframe.setAttribute('style', `width: ${size};`);
    });
  });
};
