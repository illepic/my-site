---
title: Alfred Workflow for Brett Terpstra's `doing` CLI
category: Technology
tags:
  - Alfred
  - productivity
---
The Mad Scientist [Brett Terpstra](http://brettterpstra.com) is at it again, this time with a nifty script for "Scatterbrains" that captures what you are doing, and provides an easy way to find out what it was once you get off track and need to mentally re-orient yourself when coming back to a project – super handy in my opinion. Check out his [project page for `doing`](http://brettterpstra.com/projects/doing/). 

He's a LaunchBar user and suggested that someone could whip up an Alfred Workflow, so I did. This is a straight port of his LaunchBar script that allows either the simple adding of a new item or asking what are the recent items. Much more is available via the CLI, and could be added later, but let's start with this.

## How to use

1. Follow [his instructions](http://brettterpstra.com/projects/doing/) (tl;dr: `gem install doing`)
2. [Install this Workflow](https://github.com/EvanLovely/alfred--doing/raw/master/Doing.alfredworkflow)
3. Type `doing ?` to get a Large Type display of your recent items. Identical to running `doing recent`. Hold Command to get the list from the Later list. Identitcal to running `doing show later`.
4. Type `doing "new item to do"` to add "new item to do" to your current list. Identical to running `doing now "new item to do"`. Hold Command to send it to the Later List, identical to running `doing later "item to do"`.


### How to make sure Alfred's query window is dismissed after running `doing ?`

After you run `doing ?`, you may notice Alfred's window is still hanging around, to fix that change this:

![Turn on Auto-Hide Large Type in Alfred Prefs](https://github.com/EvanLovely/alfred--doing/raw/master/assets/alfred-large-type.png)

Hat tip to [Sam Kimbrel](http://www.samkimbrel.com/posts/2013-12-24-os-x-shell-large-type.html) for that, along with the way to get Alfred's Large Type to be scriptable. 

## Feedback ##

I welcome any feedback and would love to help anybody with issues they might have. I've got this as a [repo on GitHub](https://github.com/EvanLovely/alfred--doing) for anybody interested and welcome anybody to [create a new issue](https://github.com/EvanLovely/alfred--doing/issues/new) or feel free to comment below or even reach out to me on Twitter: [@EvanLovely](http://twitter.com/EvanLovely). Hope this helps someone out there!