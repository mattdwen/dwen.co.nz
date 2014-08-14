---
layout: post
title: Gource code visualisation
date: 2012-10-17 17:06:07 +13:00
---
So I recently discovered [Gource](http://code.google.com/p/gource/) and I just had to have a play. It basically takes your source code repository, and turns it into a visual representation of who did what when.

<iframe width="560" height="315" src="http://www.youtube.com/embed/7Dohs4uoSGk" frameborder="0" allowfullscreen></iframe>

This is the main development branch of the framework and CMS I'm writing for Xplore. It's not from scratch, as I cheated the initial import into Mercurial from SVN about a year ago, by doing a push of the current flat code state, rather than import the old repository.

I have to say Gource is about the easiest thing I've ever used. It simply just worked. Copied and pasted the example command, changed the paths and bingo! Even the compression using ffmpeg worked - until I uploaded it to YouTube, which decided to totally destroy the video. Not sure what's going on there, but I must have had about 20 attempts at finding compression settings that YouTube didn't convert to gray blurred macroblocks.

I'll have to do a DIVA version too.
