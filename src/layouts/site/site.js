const util = require('../../0-base/util');

module.exports = props => `<!doctype html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <title>${util.docTitle(props)}</title>
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
  <div id="app">${props.renderedPage}</div>
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
  <noscript>
    <link 
      href='https://fonts.googleapis.com/css?family=Inconsolata&subset=latin'
      rel='stylesheet'
      type='text/css'
    >
  </noscript>
  <script src="${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'}/assets/bundle--main.js"></script>
  <script>
    if (window.location.hostname === 'www.evanlovely.com') {
      (function () {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://evanlovely.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0])
          .appendChild(dsq);
      })();
    }
  </script>
  <script>
    if (window.location.hostname === 'www.evanlovely.com') {
      // this is set on my browsers to ensure I don't trigger pageviews on prod
      if (!(JSON.parse(localStorage.getItem('doNotTrack')))) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-45410005-1', 'auto');
        ga('send', 'pageview');
      }
    }
  </script>
</body>
</html>`;
