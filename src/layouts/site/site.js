'use strict';
module.exports = function(props) {
return `<!doctype html>
<html lang="en-us">
<head>
  <meta charset="UTF-8">
  <title>${props.title ? props.title + ' | ' + props.site.title : props.site.title}</title>
  ${props.site.description ? `<meta name="description" content="${ props.site.description }">` : ''}
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body class="site">
  ${props.renderedPage}
</body>
</html>`;
};
