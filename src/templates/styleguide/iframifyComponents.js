module.exports = (components) => {
  require('iframify'); // eslint-disable-line global-require
  const iframify = window.iframify;
  const bodyClasses = document.querySelector('body').getAttribute('class');

  Array.prototype.forEach.call(components, component => {
    const el = document.querySelector(component.selector);
    Array.prototype.forEach.call(component.sizes, size => {
      const newEl = document.createElement('div');
      newEl.appendChild(el.cloneNode(true));
      const el2 = el.insertAdjacentElement('afterend', newEl);
      const iframe = iframify(el2, {
        bodyAttr: {
          class: bodyClasses,
        },
      });
      iframe.setAttribute('style', `width: ${size};`);
    });
  });
};
