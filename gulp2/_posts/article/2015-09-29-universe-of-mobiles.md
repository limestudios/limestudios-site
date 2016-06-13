---
layout: posts
ref: universe-of-mobiles
title:  Universe of Mobiles
categories: article
tags: article / design
color: "#FFF2E8"
theme: light
cover-image: /assets/img/posts/article/universe-of-mobiles/screenshot8.png
image: large
author: Liam Craver
---
##Background
I was tasked with creating a modern interpretation of a master artist. I choose Alexander Calder as my artist and reimaged his mobiles. Alexander Calder said he started creating mobile after falling in love with the cosmos. He wanted to recreate what he saw in the night sky.

##Mobile Generator
Alexander Calder wanted his mobiles to be infinitely complex, never repeating. I took this idea to the next level and created a simple mobile generator in Unity.

<div class="image-wrapper">
{% for i in (1..6) %}
  <img class="float medium border" src="/assets/img/posts/article/{{page.ref}}/screenshot{{ i }}.png"/>
{% endfor %}
</div>

###How it Works
The generator takes in a word and uses it as the seed to drive the rest of the randomization. First the camera's location is randomized, then the colors and shapes it will use. It then selects a random amount of branches to spread out from the top of the mobile, and it does that again for each child branch. All branches are positioned randomly and when on the last level the branches terminate into hanging shapes.

###Source Code
You can find the unity source files for this project over on my <a class="line-s" href="https://github.com/lcraver/alexander-calder-mobiles">Github</a>.

<div class="image-wrapper">
{% for i in (7..12) %}
  <img class="float medium border" src="/assets/img/posts/article/{{page.ref}}/screenshot{{ i }}.png"/>
{% endfor %}
</div>
