---
title: EvanLovely.com v6 - A Total Refresh
date: 2016-08-24
tags:
  - web-dev
  - this-site
  - reactjs
excerpt: Everything has changed!! The whole site has been re-written from the ground up with a completely different front and back end. 
---
Hello! **Wow**: it's been a *long* time since I posted on my site: nearly a year and a half! Plenty of reasons and excuses why I didn't, but that's not really important. Anyway, one of the primary motivators of changing things around was that the former build system was Jekyll; which it and its plugins are written in Ruby, a language I'm not extremely proficient in. I wanted to be able to more easily manipulate the core of what was going on, I needed it in my strongest languages: JavaScript.

Initially it seemed the clear winner was [Metalsmith][metalsmith], which is a great system, however the more I built it out, the closer to the *metal* I needed to be. Most of the plugins for Metalsmith simply wrapped many of the tried and true best of breed node.js modules... while being a little out of date behind. I wanted more control.

## Fundamentals of Version 6 of My Site

All source code for the site is [on GitHub](https://github.com/EvanLovely/my-site). I still believe in [my reasons to use Jekyll and preference of long term updates to notes over blog posts][v5] so all [content](https://github.com/EvanLovely/my-site/blob/master/content/) is Markdown files with YAML front matter, in the Jekyll style. I love the portability of that format! 

### Content

The content goes through a very customized [build script](https://github.com/EvanLovely/my-site/blob/master/lib/buildJson.js) that creates a json file for each piece of content after transforming the content in a number of ways: Markdown to HTML, code syntax highlighting, and turning plain Markdown image tags into responsive images using `srcset` to name a few. The reason I generate a file instead of using it in memory is so I can get the data via an AJAX call later using `fetch`.

### Templating

From each content's json file generated, I take that data and pass it to a React template using [`renderToString()`](https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring) to create static html in the build directory. React is really a quite fabulous templating language for static sites. I heavily vetted Mustache, Twig, Swig, and Nunjucks before settling on React. 

I deeply embrace the concept of Resusable Components in web development and knew I couldn't have a site that didn't let me do what I wanted to do. I won't get into it in depth here why the other templating languages didn't work for me, but I'll just say that when a Component expects a certain kind of data being passed to it and the place where you use that Component has a different structure of that data, then you get into problems and you need to restructure the data before you can use the Component properly. React let's me handle those transformation the easiest; mainly cause of full access to JavaScript. 

I'm also have a [Pattern Lab for my Site](/patternlab) that acts as a Styleguide and a Component Library for all my React templates. I've created a custom intermediary step as Pattern Lab doesn't have an engine for React yet, but with all the great work going on with [Pattern Lab 2's modular approach to engines and languages](https://www.smashingmagazine.com/2016/07/building-maintaining-atomic-design-systems-pattern-lab/) I see the proper groundwork laid for it to happen.

### Styling

Can you believe my old site was still running LESS CSS?!?!? Oh boy. When I first got started with CSS Preprocessors, I chose LESS over Sass (mainly cause of variable scoping and liking JavaScript over Ruby), but got talked into Sass by [Chris Bloom](http://twitter.com/illepic) and totally have loved it ever since. (PS Totally hilarious that LESS has always been JavaScript and fast and Sass was Ruby but migrated to JavaScript for 10x speed increase purposes)..... anyway: my whole site is using Sass now!

I consistently use the BEM naming scheme for my CSS class names to create scope for the components they style. Each Sass file sits next to its Component that it styles. 

#### Design

A clean slate. I really liked my [old site's design](http://v5.evanlovely.com/), but it had been around for a long time and it was necessary to wipe the slate clean and start afresh. I feel really good about the foundation that I've laid here, and I still see many areas of improvement that I look forward to iteratively implementing on. Fun fact: the same theme started on WordPress (v3), got [migrated to Drupal and turned responsive][v4] (v4), and finally to Jekyll (v5). 

### Isomorphic JavaScript Single Page App

This entire site works with JavaScript disabled (even the mobile menu trigger); however, with JavaScript enabled a much faster experience is had since the site will act like a SPA (Single Page App). When you click a link to another page, it just fetches the content for that page and re-renders the page. This is where those compile json files come into play; try appending `index.json` to any url on this site to see it's data. Super fun!

[metalsmith]: http://www.metalsmith.io/
[v4]: /blog/2013/02/evan-lovely-4-0/
[v5]: /blog/2013/11/porting-my-site-to-jekyll-knowledge-with-public-notes-over-blog-posts/
