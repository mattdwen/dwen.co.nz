---
layout: post
title:  "Web Starter Kit"
date:   2014-06-20 10:32:04 +12:00
---

Google have just dropped [Web Starter Kit](https://developers.google.com/web/starter-kit/) on the world, which is their _"opinionated recommendations on boilerplate and tooling for building an experience that works great across multiple devices"_. This project is part of Google's larger [Web Fundamentals](https://developers.google.com/web/fundamentals/) project.

It's similar to [Bootstrap](http://getbootstrap.com/), which I use regularly, in that it provides a framework of re-usable elements, and starting place for the structure of your page. One thing it has over Bootstrap, is it includes automated build tools using [Gulp](http://gulpjs.com/), which builds and optimises your site to meeting Googles own [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) recommendations.

At first glance I'd say it's a little too _opinionated_, at least in terms of styling influence. The stylesheets are built using [Sass](http://sass-lang.com/), and most of the style variables appear to be defined in `_utils.scss`, but the defaults are certianly very _Google_. No one with any cred is going to use Web Starter Kit in it's default state, but there are a lot of very _Bootstrap_ sites out there as well.

What I do find interesting, is what this project implies Google believe to be ready for the web, from an HTML5 and CSS3 point of view. You can forget about supporting IE9 or less; a number of the components make use of [Flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes), with no polyfill. Using the __Last 2 versions__ rule, IE9 isn't supported anyway, but there is still a very large userbase out there. Arguable with the end-of-life of Windows XP, there's no reason why an Windows user shouldn't be on IE10 or newer anyway.

They're also using `transition` and `transform`, which while widely supported now (no worse than flex layouts anyway), should still be vendor prefixed for now (which they do).

The responsive breakpoints also use `min-device-width`, rather than just `min-width`, which detects the browser size. This means no more window re-sizing to do basic RWD development, and instead you need to make use of full device emulation. I find that getting a site generically "right" responsively is easy enough by resizing windows, or using Firefox's [Responsive Design View](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View), but these methods are rendered ineffective by this technique.

One technique I like which I hadn't seen before is the use of `data-` attributes to fill `content` CSS properties. They use this to great effect to create a responsive table solution.

The table is declared in code as:

    <table>
      <thead>
        <tr>
          <th>Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-th="Header">Content</td>
        </tr>
      </tbody>
    </table>

Which then has a CSS setup which hides the `thead`, and appends the `data-th` property before the `td`:

    table th { display: none; }
    table td:before {
      content: attr(data-th) " :"
    }

Add in some padding and formatting and you get a reasonable data-list type appearance.

![](/img/2014/jun/table-datalist.png)

I like both the use the data attributes, and the rwd table, but neither are going to easily integrate with any WYSIWYG CMS that I'm usually building templates for.

I'm probably not going to go running to Web Starter Kit from Bootstrap, but there's a few things I might integrate with my current base template.
