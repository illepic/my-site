---
title: Alfred Workflow for Snippets
weight: 3
excerpt: "An Alfred Workflow for managing text and code snippets with tag support."
tags:
  - Alfred
  - productivity
  - web-dev
---
This helps you manage code snippets easily. You dedicate a folder that plain text files are kept in (default to `~/Dropbox/snippets`) and by typing `?snip` in Alfred, it will search the name of the file, contents, Mavericks Tags, Spotlight Comments and any other thing Spotlight searches for. Sadly, you can't search for the names of parent folders though [due to a limitation in `mdfind`](http://stackoverflow.com/questions/1341590/no-results-in-spotlight-in-searches-against-kmditempath) - however, that doesn't stop you from using folders to organize your snippets if you'd like. The great thing about the snippets being stored in a folder as plain text files is that there are many ways to add to it and get to the data. I think I'll try keeping all my cloned Gists in here with the [Gist to Clone All Gists](https://gist.github.com/mbostock/3883098). The Tags and contents of the snippet are shown under the name of the file. After searching for snippets using `?snip {query}`, just hit enter to copy and insert it, CMD+Y to QuickLook it, or Option+Enter to edit it.

## Install ##

1. [Download my Snippets Alfred Workflow here.](Snippets.alfredworkflow). Optionally change the default directory away from `~/Dropbox/snippets` by following the directions below.
2. Install the [`tag` command](https://github.com/jdberry/tag) (tl;dr: `port/brew install tag`)
3. Type `?snip` and hit Cmd+Enter to add your first snippet (or drag files into `~/Dropbox/snippets`). 
4. Type `?snip` to search through your snippets and paste them in!

## Quick Video Showing How This Is Used ##

[![Video](using-Alfred-Snippets_mov.jpg)](https://www.dropbox.com/s/bn1wjewo5mq2wk1/_using-Alfred-Snippets.mp4)

## Change the Default Path ##

If you want to use a different folder, then after importing the workflow, change the path here:

![Where to change the path](snippet-paths.png)

Would love any feedback!