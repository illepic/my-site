---
title: Better management of IE & Media Query CSS Styles using LESS CSS
categories:
  - Technology
tags:
  - css
  - css-preprocessors
  - less-css
  - responsive-web-design
  - web-dev
status: publish
type: post
published: true
meta:
  _rawhtml_settings: '0,0,0,0'
  _cws_is_markdown: '1'
  _edit_last: '1'
  dsq_thread_id: '1023936043'
  _wpbitly: 'http://bit.ly/VIVuH3'
  _su_title: ''
date: 2012-10-06T00:00:00.000Z
redirect_from: /blog/technology/better-ie-media-query-less-css/
---
**Wow!** I just [found out](http://alwaystwisted.com/post.php?s=2012-06-05-another-approach-to-mobile-first-css-whilst-supporting-internet-explorer) that you can do this awesomeness with LESS:

## Inline Media Queries

```scss
header {
  background-color: red;
    @media screen only and (min-width: 20em) {
      background-color: blue;
    }
}
```

Which when compiled into CSS returns us with this.

```css
header {
  background-color: red;
}

@media screen only and (min-width: 20em) {
  header {
    background-color: blue;
  }
}
```


## Using `&` to put a class before instead of after

You can use the  `&`  **after** (normally *before* to combine selector strings) which takes the preceding element and then puts the .ie8 class in front of it. So for example writing this LESS.

```scss
header {
  background-color: red;
  .ie8 & {
    background-color: blue;
  }
}
```

Which gives us this CSS.

```css
header {
  background-color: red;
}
.ie8 header {
  background-color: blue;
}
```


## Why this is cool

This really helps prevent fragmentation of styles. Before learning these techniques, I'd often put IE styles in their own `ie.less` sheet and media queries in `media-queries.less`, but with these new techniques, I can keep styles bundled with their other relevant rules.


