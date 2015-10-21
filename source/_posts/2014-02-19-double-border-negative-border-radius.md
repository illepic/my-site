---
title: Double Border Button with Negative Border Radius
category: Technology
tags:
  - CSS
  - Front End Web Development
---
I'm working on a project and I get the designs for this button style and I am really happy how it all came together. At first I thought that a CodePen I came across talking about [double border buttons][1] would help, but it didn't ultimately. Then I came across the excellent [negative border radius example by Lea Verou][2] and it really helped, but it didn't address the double borders. 

I then decided to use the `:before` and `:after` of the button to also create that same negative round border style shape (that doesn't even use `border-radius`, it uses radial gradients!!). I take them and extend them out from the button; twice, in two different colors.

<p data-height="268" data-theme-id="0" data-slug-hash="xFryL" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/EvanLovely/pen/xFryL'>Double Negative Borders</a> by Evan Lovely (<a href='http://codepen.io/EvanLovely'>@EvanLovely</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

I'm having a **very** strange problem though: when the button is an odd number of pixels, it gets a white line through (the background color) because the 4 radial gradients used to create this don't evenly meet in the middle. I'd love to hear some ideas on how to fix it!

![Broken Button][image-1]

Also, I know I definitely need to uses some Compass Mixins to keep that code tight.

[1]:	http://codepen.io/anon/pen/InDqa
[2]:	http://lea.verou.me/2011/03/beveled-corners-negative-border-radius-with-css3-gradients/

[image-1]:	/img/2014/02/double-border-broken-button.png