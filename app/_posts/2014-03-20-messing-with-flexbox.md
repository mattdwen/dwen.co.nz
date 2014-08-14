---
layout: post
title: Messing with flexbox
date: 2014-03-20 14:22:37 +13:00
---
I finally had a chance to experiment with flexbox, a fancy new "coming soon" feature for CSS. Browser is support [is getting close](http://caniuse.com/flexbox).

Chris Coyer has good write up of all the features: http://css-tricks.com/snippets/css/a-guide-to-flexbox/

It's a fantastic system which is going to solve a lot of layout problems.

Anyway, what I was trying to achieve was a layout with two fixed width columns, and a third fluid which fills the remaining space. Normally I would have done this by absolutely positioning the 'fluid' element.

This seemed to be something flexbox was built for, but the answer wasn't obvious.

The property I was after was `flex-grow`, which defaults to `0`, meaning that the element will not grow to fill. By changing this to `1` on a specific element, that element will then grow to fill the remaining space, with a 1:1 size ratio with all other elements with the same value.

If I change this to `2`, then it'll grow to be twice the size of any element with a value of `1`. Anything `0` remains at whatever it's fixed size is.

<p data-height="268" data-theme-id="0" data-slug-hash="ghJEL" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/mattdwen/pen/ghJEL/'>Flexbox fixed+fluid</a> by Matt Dwen (<a href='http://codepen.io/mattdwen'>@mattdwen</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
