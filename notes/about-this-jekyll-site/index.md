---
title: "About This Jekyll Site"
layout: note
weight: 5
tags:
  - web-development
  - jekyll
---
Here's some insight into how I built my site on [Jekyll](http://jekyllrb.com/). My whole site's source code is available to look at on my [GitHub Page](https://github.com/EvanLovely/my-jekyll-site) for the curious. Hope this helps some people!

## Deployment

I use [Drafts for iOS](http://agiletortoise.com/drafts) to kick off a build of my Jekyll and send the changed files to my web server. There are separate ones for sending to a testing URL or to the live site. Here's what happens:

1. I kick off either the [Deploy to Staging (testing) Drafts action](drafts://x-callback-url/import_action?type=dropbox&name=Deploy%20My%20Site%20to%20Staging&path=%2Fmy-jekyll-site%2F_scripts%2F&filenametype=2&filename=start-staging-deploy&ext=txt&writetype=0&template=Sent%20from%20Drafts%3A%20%5B%5Btime%5D%5D) or the [Deploy to Production (live) Drafts action](drafts://x-callback-url/import_action?type=dropbox&name=Deploy%20My%20Site%20to%20Production&path=%2Fmy-jekyll-site%2F_scripts%2F&filenametype=2&filename=start-production-deploy&ext=txt&writetype=0&template=Sent%20from%20Drafts%3A%20%5B%5Btime%5D%5D) from Drafts. *Clicking either of the previous links on an iOS device with Drafts installed will add the action.* All this does is upload a blank text file to my Dropbox with a specific name to a specific folder.
2. A [Hazel](http://www.noodlesoft.com/hazel.php) rule on my [Mac Mini setup in a server warehouse](http://macminicolo.net/) is watching that specific folder for files with those specific names. [Here are the two Hazel rules for kicking off the deployment scripts](/notes/about-this-jekyll-site/scripts.hazelrules). All this does after starting is run the scripts in the next steps with something like `sh deploy.sh` and then deletes the text file.
3. The scripts that run will build Jekyll to a separate folder with all production flags ready (i.e. scripts and CSS files are compressed for example). Once done it will upload the site to my web server at Dreamhost (my Mac Mini Colo is not my web server, *yet*) via [rsync](http://en.wikipedia.org/wiki/Rsync) to make sure it only uploads files that have changed. You can view the [staging deployment script](https://github.com/EvanLovely/my-jekyll-site/blob/master/_scripts/deploy-to-staging.sh) or the [production deployment script](https://github.com/EvanLovely/my-jekyll-site/blob/master/_scripts/deploy-to-production.sh) if you'd like to look under the hood.
4. Once that's done, a [Pushover](https://pushover.net/) notification is sent to my iPhone with a link to let me know the whole process is done. 


## Notes

I use my [notes section](/notes) over blog posts wherever possible so I can continuously build and iterate on my shared knowledge. Here's my [post talking about using notes over blog posts]({% post_url 2013-11-19-porting-my-site-to-jekyll-knowledge-with-public-notes-over-blog-posts %}) where I talk about it more in detail. I'll use blog posts with a title link to the note to announce significant changes to notes.

### GitHub History Links

Here's my link I have on my notes that links to the files history on GitHub: 

{% highlight html %}
<a href="https://github.com/EvanLovely/my-jekyll-site/commits/master{{ page.url | replace:".html",".md" }}" target="_blank">View historical changes to this note.</a>
{% endhighlight %}

## Includes

### Responsive Image List 

Will create a list of images for these files in the folder `/photos/india/_full/` using the [imgs.html include]({{ site.github_file}}/_includes/imgs.html)

- `Bylakupee-Namdroling-Monastery-01.jpg`
- `Bylakupee-Namdroling-Monastery-02.jpg`
- `Bylakupee-Namdroling-Monastery-03.jpg`

```
---
imgs:
  - 01
  - 02
  - 03
---

{% include imgs.html path="/photos/india/Bylakupee-Namdroling-Monastery" %}
```

## Setup

### Prerequisites

- [Jekyll](http://jekyllrb.com)
- [ImageMagick](http://www.imagemagick.org/script/index.php)
- [MiniMagick](https://github.com/minimagick/minimagick)
- [redcarpet](https://github.com/vmg/redcarpet)
