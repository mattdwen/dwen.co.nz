---
layout: post
title: Time for a new design tool
date: 2012-04-27 16:51:49 +13:00
---
We all know the web has changed a lot in recent years. No longer tied to the desktop, we're browsing with a number of devices, resolutions, and capabilities.  We all know how to deal with this too; fluid/responsive grids are well established, and we're beginning to solve the "retina" problem.  We're throwing all sorts of technologies and techniques at getting our sites out there, but they all tend to start at the same place: Photoshop.

Now I suck at design.  I'll never put myself under that banner, but I like to think I have a clue about using the designers' tools, and knowing what looks good or not.  The line between designer and developer has certainly blurred further recently. Developers after often split into front-end and back-end.  It's not uncommon for designers to fall under the "front-end developer" banner these days.

I'm often sent a .psd of a design, and tasked with converting that to a functional site.  This .psd will be constructed using all the tricks that Photoshop has to offer: obscure blend modes, layer effects, fonts I dont have, you name it. Half the challenge is usually converting what's on the canvas into a usable (and repeatable) set of pixels in flat sprite. These tools should not be taken away from a designer, but they're no-longer conducive to the medium.

Some "designers" are actually producing full HTML and CSS templates. I've never worked in this situation, but I imagine they must still start with a Photoshop type tool, and at least conceptualize and mock-up their design.  If the designer can build the HTML and CSS, this is win-win, as they can fulfill their designs for all the resolutions and orientations required for the project.  But while not really "developing", angle brackets can still be pretty scary, and is another large subject to keep up to date with.  I'm still yet to find a useful WYSIWYG tool which generates something I'd actually deploy and maintain, so anyone worth their salt is going to be constructing the template at a text level - which is arguably "slow". That and people who are awesome designers *and* can bash out a flexible, light, and maintainable set of HTML and CSS, using something useful like LESS at the same time, are a rare treasured beast.

As soon as you've opened Photoshop and set a canvas size, you've broken the model the new web. Of course you can create a .psd for a set of fixed resolutions, but sharing assets between files is difficult, and you're still dealing with fixed pixels. [As we know](http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density), it's pretty hard to pick the breakpoints of when our responsive designs should change. You're also looking at extra time for each resolution you're mocking.

One thing I'm not going to go into here, is you shouldn't even attempt to build a fluid/responsive site unless you *know* what your content is. Ipsum don't cut it.

I've worked with Windows Forms for a number of years, and have recently started using Windows Presentation Framework (WPF). Visual Studio allows you anchor and dock elements with a parent element. By defining that the right edge of an element must always be X pixels from the right edge of the window, the child element will stretch with the window as its dimensions shrink and grow. Of course you can define this for any edge (or not anchor it, leaving it at a fixed width/height). Pretty simple, and fundamental to the concept of a "fluid" grid.

Photoshop allows you to define vector shapes, and apply styles to them (and save these styles to be reusable), but Photoshop isn't designed to be fluid, nor will it probably ever be (after all, it is PHOTOshop). (BTW designers, please use vectors and styles more often, it's easier for you and us.)

WPF (also implemented as Silverlight) gives you a lot more styling tools than WinForms ever did, but have you tried styling a combobox?! You've basically got to re-write a couple of hundred lines of XAML (the WPF markup language) to get what you want. Hardly designer friendly.

The release of Adobe Dreamweaver CS6 is imminent, and is going to introduce some interesting features, namely built in responsive grids, and the ability to preview your site in multiple sized browser windows at once.  I'm not sure if this preview is as you're writing code, which it would have to be to be useful. There are also some built in tools for setting CSS3 transitions, but in terms of building a stylesheet, you still need to know how to write CSS3.  The demo videos are very awkward in terms of setting these properties, and the narration still refers to "the designer wanted this" - so this is not a tool for designers.

Between all these platforms, we have the technology to make a new design tool:

 - Draw a shape.
 - Dock or anchor it within it's parent.
 - Resize the window and watch the shapes change with it.
 - Define a style for the shape - background colour, borders, rounded corners, drop shadows, type properties, etc.
 - Save this style as something reusable which can be applied to other elements.
 - Display our design at multiple resolutions at the same time.

I'm not asking for this tool to generate useful code for me, though that'd be awesome. I want something that a designer can use quickly and visually, to conceptualise a design for all platforms, at the same time. If it can't generate the code, then a developer should be able to inspect the design easily (like with Firebug), rather than using a marquee tool and checking the info palette in Photoshop to check how big something is.  We should also be able to tell what element is the same across the different resolutions.

That's probably the biggest problem with this tool; being able to specify an element's behavior at different resolutions. We know how to do it from a CSS point of view, but building a interface to easily control this may be difficult.

I'd almost say the web itself is the perfect platform for building this tool, aside from the power of Photoshop. Yes, web image editors are becoming more and more powerful, but it will be a while yet before the full power of Photoshop is realised via HTTP. And that's power that should not be taken away from the designer.
