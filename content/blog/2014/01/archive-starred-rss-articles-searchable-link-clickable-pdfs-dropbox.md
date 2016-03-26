---
title: 'Archive your Starred RSS articles to searchable, link-clickable PDFs on your Dropbox'
category: Technology
tags:
  - Dropbox
  - Pinboard
  - utilities
  - reference
date: 2014-01-02
---
Summary: This will show you how you can simply "star" an article in your RSS feed-reader and then have it become automatically bookmarked on Pinboard, then turned into a searchable, link-clickable PDF on your Dropbox.

## Install Web Screen Shot App

I would suggest building this workflow "backwards", so to get started install [Paparazzi](http://derailer.org/paparazzi/), a very useful full page screen shot utility (helpful for web design portfolio), on your Mac (preferably an always on Mac like a [Mac Mini Server Co-Located](http://macminicolo.net/), however a laptop will work just fine). 

You can go into preferences and set the width that it takes screenshots, but I find the default to be fine; however I have experimented with it grabbing versions for mobile/tablet as that seems to often cut out the extraneous sidebar. I also want to get some CSS in the user-style sheet that will hide sidebars and comment sections, but I haven't gotten that far; nor is it necessary.

## Install Terpstra's Pinboard Tools

The amazing [Brett Terpstra has a tool to turn web-based Pinboard bookmarks into local file links](http://brettterpstra.com/projects/pinboard-openmeta/)  (`.webloc` files) - very small files when opened will launch a browser to the site. In addition it'll turn your Pinboard tags into OpenMeta tags on the file, and I'm sure he'll soon update it for Mavericks tags (in the meantime, use [this](http://mosx.tumblr.com/post/54049528297/convert-openmeta-to-os-x-mavericks-tags-with-this)). Having locally accessibly, tagged bookmarks that can be searched by Spotlight or Alfred/LaunchBar is **very** helpful in my opinion. The option that we are really interested in however, is when a Pinboard bookmark is tagged with "pdfit" as well — which tells the app we just installed, Paparazzi, to make a PDF out of the page and then store it into a separate directory. I personally have two directories in my Dropbox: "/library/bookmarks" and "/library/bookmarks-PDF". I often preform searches on my whole "/library/" folder, a subject of another article.

## Link your Feed Reeder Starred Articles to Pinboard

Now, get the RSS feed of your Starred articles; most services should offer this, I use Feed Wrangler. Then go and clone my [IFTTT RSS Starred to Pinboard action](https://ifttt.com/recipes/137671) and put in your own URL, which will make new Pinboard bookmarks and tag them with "pdfit" from an articles starred in your feed reader. Finally, test it!

Hope this helps! Have a great day!

