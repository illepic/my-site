---
title: Getting Dropbox Direct Links via Shared Links with Alfred
layout: post
category: Technology
tags:
  - Alfred
  - Dropbox
date: 2014-03-13
---
When you share an image (or any file) with Dropbox, it sends people to a page that wraps that file in an HTML page that is Dropbox branded. Here is an easy way using [Alfred](http://alfredapp.com) (with it's paid Powerpack) to get a link that links directly to the file. This is useful for using as the `src` in an `<img>` tag. I often use it in a wiki or a task management site like Jira or Redmine to show a screenshot. All we need to do is replace `www.dropbox` with `dl.dropboxusercontent` in the share link, like my friend [Ryan points out](http://ryanmo.co/2013/11/03/dropboxsharedlinks/).

After [downloading my Alfred Workflow](https://www.dropbox.com/s/qem95ur8cuf1u6d/Make%20Dropbox%20Direct%20Link.alfredworkflow), here's all you need to do:

1. Select an image or any file in Finder.
2. Click the Dropbox icon, then select "Share Dropbox Link".
3. Invoke Alfred, then type "dbd" (it stands for DropBox Direct).
4. Paste the link anywhere needed.

Hope this helps anyone out there! Give me any feedback if you come across problems!
