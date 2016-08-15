---
title: QuickLook Generator for YAML files
weight: 10
excerpt: Use Mac's QuickLook feature on YAML files
tags:
  - mac
---
I couldn't find one, so I took [Duncan Robertson's plain text QuickLook plugin](http://whomwah.github.io/qlstephen/), and added support for `*.yml` files. You can download my [QuickLook for YAML plugin here](QLStephen.qlgenerator.zip). Place it in `~/Library/QuickLook/` and then run `qlmanage -r` to force reload QuickLook's generator list.