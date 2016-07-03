module.exports = function (props) {
  return `<!doctype html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <title>${props.title ? props.title + ' | ' + props.site.title : props.site.title}</title>
  ${props.site.description ? `<meta name="description" content="${props.site.description}">` : ''}
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="/assets/style.css">
  <script>
    (function(d) {
      var config = {
        kitId: 'vxa2vgs',
        scriptTimeout: 3000,
        async: true,
        active: function() {
          if (window.CustomEvent) {
            var event = new CustomEvent('fontsLoaded');
          } else {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent('fontsLoaded', true, true);
          }
          
          document.dispatchEvent(event);
        }
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
  </script>
</head>
<body class="${props.site.bodyClasses.join(' ')}" data-template="${props.template}">
  ${props.renderedPage}
  <script>
    function loadStyleSheet(src){
      if (document.createStyleSheet) document.createStyleSheet(src);
      else {
          var stylesheet = document.createElement('link');
          stylesheet.href = src;
          stylesheet.rel = 'stylesheet';
          stylesheet.type = 'text/css';
          document.getElementsByTagName('head')[0].appendChild(stylesheet);
      }
  }
  loadStyleSheet('https://fonts.googleapis.com/css?family=Inconsolata');
  </script>
  <noscript> <link href='https://fonts.googleapis.com/css?family=Inconsolata&subset=latin' rel='stylesheet' type='text/css'></noscript>
  <script>loadStyleSheet('//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/darkula.min.css');</script>
  <noscript><link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/darkula.min.css"></noscript>
  <script src="/assets/bundle--main.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
</body>
</html>`;
};
