---
title: Turn a Spreadsheet into Markdown Files to fuel the content of a Jekyll Site
weight: 3
excerpt: >-
  Each column becomes a new YAML front matter setting and each row is a new
  Markdown file
tags:
  - jekyll
  - markdown
---
Have a client or a non-developer prep a bunch of content collaboritavely in Google Docs, then turn each row into a different page on a [Jekyll](http://jekyllrb.com) Site easily.

I was able to take [this script that turned a CSV file into a series of YAML files](https://github.com/hfionte/csv_to_yaml) which did most of the work here (thanks!). I modified it a bit to create Markdown files with YAML front matter, perfect for Jekyll pages (or posts). 

You can prep content in a spreadsheet by using this format:

![Spreadsheet Example](spreadsheet.png)

1. Afterwords, export the spreadsheet as a CSV and name it `data.csv`.
2. Download the script <a href="https://raw.github.com/EvanLovely/csv_to_jekyll/master/csv_to_jekyll.py">`csv_to_yaml.py` here.</a>
3. Put the two files in the same directory, then run `python csv_to_yaml.py`.

This project is up on [my GitHub](https://github.com/EvanLovely/csv_to_jekyll) page for anybody curious.

There isn't currently a way to have the body (content) exported this way, it was originally made to get a bunch of meta-data onto a ton of files, which they'd add content to later. I could see it being done, so if you need that specifically, hit me up and I'll see if I can put it together. 