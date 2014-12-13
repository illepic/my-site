---
title: Creating a Featured Posts Lists Limited in Count in Jekyll 
layout: post
category: Technology
tags:
  - Jekyll
---
I was having problems getting a list of [Jekyll](http://jekyllrb.com) blog posts that had a specific property declared in the YAML front matter (a simple `featured: true`) and limiting the list. If you do what I did at first: 

{% raw %}

	{% for post in site.posts limit:1 %}
	   {% if post.featured == true %}
	
	     {{ post.title }}
	
	   {% endif %}
	{% endfor %}

{% endraw %}

It will only work if the first post is a featured post, but not if the second post or after is the featured post. That's because the list is limited before it's filtered. Additionally, the {% raw %}`{% if %}`{% endraw %} does not allow `limit:1`. 

I racked my brain and the resources of the Internet with many possible approaches that I won't bore you with, but thanks to [this very helpful comment](https://github.com/jekyll/jekyll/issues/975) I was able to build this out that worked great:

{% raw %}

    // Emulates `limit:1`
    {% for post in site.posts %}
        {% if post.featured == true %}
          {% capture count %}{{ count | plus: '1' }}{% endcapture %}
          {% if count == '1' %}

            {{ post.title }} 

          {% endif %}
      {% endif %}
    {% endfor %}
              
    // Emulates `limit:2 offset:1`
    {% for post in site.posts %}
      {% if post.featured == true %}
        {% capture counttwo %}{{ counttwo | plus: '1' }}{% endcapture %}
        {% if counttwo == '2' or counttwo == '3' %}

          {{ post.title }}

        {% endif %}
      {% endif %}
    {% endfor %}

{% endraw %}

PS I can't even find documentation where I [normally look](https://github.com/shopify/liquid/wiki/liquid-for-designers) for {% raw %}`{{ count }}`{% endraw %}.
