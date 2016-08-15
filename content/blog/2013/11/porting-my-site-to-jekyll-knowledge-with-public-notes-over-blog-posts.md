---
title: >-
  Porting My Site to Jekyll and Sharing Knowledge with Public Notes over Blog
  Posts
type: post
categories:
  - Technology
tags:
  - this-site
  - jekyll
  - web-dev
date: 2013-11-19T00:00:00.000Z
redirect_from: >-
  /blog/technology/porting-my-site-to-jekyll-knowledge-with-public-notes-over-blog-posts/
---
I've ported this site to [Jekyll](http://jekyllrb.com/), the static site generator, after having it in WordPress for about a year after converting it from it's original platform, Drupal, which I do nearly all my [Front End Development & Theming](/portfolio) in. I initially moved to WordPress as I wanted a lower barrier towards publishing than Drupal; I had hoped that the plethora of apps and integration that the WordPress ecosystem provides would allow me to skip a web back-end interface when it came to something I wanted to quickly share that I discovered while working. 

However, that didn't work well as the disparity between WordPress apps and it's backend are too wide. Even using best of breed apps like [MarsEdit](http://www.red-sweater.com/marsedit/) for Mac and [Poster](http://www.tomwitkin.com/poster/) for iOS (now [unavailable as it was purchased](http://www.cultofmac.com/232139/poster-app-for-ios-acquired-by-wordpress-creator-automattic/) by the owner's of WordPress) didn't provide as good of an experience or were feature incomplete compared to logging into the WordPress backend and editing a post or page in the browser. A few examples of difficulties: custom posts, custom fields, and image galleries. 

So there I was stuck in the same position as I was with Drupal: logging into a browser to use a back end that had me filling out forms that would generate a language I am incredibly fluent in as a Front End Web Developer: HTML, while hindering me from using it as elegantly or precisly as I can and want to. In addition, I'm putting my best content and thoughts into a data silo: a MySQL database, that while is exportable, is cumbersome and not one of my proficient languages. I'd rather have that content be on my local hard drive and Dropbox, where it can be searched, edited, and added to by a wide range of tools and utilities.


## Website with Public Notes

Additionally, I've had a big change happen to my software and data storage preferences over the last year: moving as much as I can towards standard open file formats such as plain text and PDFs and away from software such as my previously loved organizational powerhouse [Evernote](http://evernote.com/). While it solved many problems in a time that other solutions wouldn't work, it's time has passed for me as the center of my information organization. I dove into plain text formated in [Markdown](http://daringfireball.net/projects/markdown/) and organized with [Notational Volocity](http://brettterpstra.com/projects/nvalt/) at the encouragment of my friend [Martin Rio](http://twitter.com/axolx).  

While I see the advantage to this and *mainly* subscribe to it's approach, I have one issue with it: where are a note's associated images, sounds, and other attachments kept? The power of plain text is undeniable, but to go 100% plain text in one's reference materials is to deny the power of imagery, sound, and video that rich notes can contain. This is where Evernote shines. That could be easily circumnavigated by keeping a note as a folder that contains the images and other attachments, with the plain text file as the main index of the words while referencing the attachments; kind of like a website. And yes, I know you could have a folder that contained just the plain text notes that referenced attachments kept elsewhere, but there's something very nice about being able to grab a folder and know that it contains all that is needed. It feels very future proof and not as brittle as having many disparate parts relying on each other. 

Now I could see where you are thinking, *"What does this have to do with your website?"* Let me bring it around: Several of my notes and reference materials I often share with others and have been dissapointed with the sharing experience; so I thought to myself: why don't I keep some of my notes public on my site? And that is what I've done with my [Notes Section](/notes).  Since my website is a collection of files that are kept on my local file system and synced with Dropbox, adding to and editing my notes is no different than changing a regular text note. Low friction publishing like I wanted.


### The entropy of blog post knowledge

Which brings me around to thoughts on blogging and publishing and how public notes can do it a little bit better. Let's take for example a favorite topic of mine: awesome Mac software. How many blog posts have you seen about someone's favorites? Is software choices static and never changing? Definitely not. It's a continuously changing and improving thing. Imagine if Wikipedia was a blog; the information would be outdated *so* quickly. Think about any forum thread you've read where you need to sum up all correct information while disregarding incorrect information. I realize my blog isn't social, but I believe there are enough parallels to mention.

Instead, I would like my software suggestions to be a single page/note that I continously update and then announce the change with a blog post. So here's my note outlining [My Awesome Mac Setup](/notes/my-awesome-mac-setup) and a blog post announcing that I switched from using Divvy to using Moom that contains thoughts on why I switched and a Git Diff of the change to the Mac Setup Note.

So that's what I hope for this recent change: to easily and frequently build a continuously improving set of information around certain favorite categories and announce those changes via my blog. I think people enjoy sites like that, such as [The Wirecutter](http://thewirecutter.com/) and the brand new [The Sweet Setup](http://thesweetsetup.com/). Also, the entire [source of this Jekyll website is viewable in a public GirHub repository](https://github.com/EvanLovely/my-jekyll-site) for any enquiring mind! **I'd love to hear any thoughts from you in the comments below!** Thanks for reading; have a great day!


