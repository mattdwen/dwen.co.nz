---
layout: post
title: PHP CSV import Mk.II
date: 2013-01-23 17:14:47 +13:00
---
I've now written a bespoke CSV data importer, specifically for the data in this particular set. The first thing which surprised me was it's only 201 lines of code shorter (1185 vs 1386). Having said that, the new importer doesn't include the 447 lines of rules which describe the dataset to the generic importer.

I wasn't expecting much from the new system. The algorithm is largely the same, though I was able to pre-define and load a number of parameters. There's just a lot less switch and if statements figuring out how to handle the rules.

For the sake of comparison, I've removed most of the memory profiling points from the original importer, so I am only recording the metrics of both systems right after each line has been imported.

![](/content/images/2014/Jan/CSVCustom1_1024x512.png)

So, no savings in the memory department then. At least PHP is consistant in it's memory allocations!

At least it was faster to execute:

>11m58s vs 11m49s

9 seconds saving. Probably within the standard deviation if I ran this multiple times. A days work with totally new code, and no difference.

Here's a magnified version of the memory traces.

![](/content/images/2014/Jan/CSVCustom2_1024x512.png)

So the new system is actually a little more memory hungry, but we're talking an average of 95KB higher at any given time.

I had a very brief play with re-enabling the [PHP MiniProfiler](https://github.com/jimrubenstein/php-profiler). I was expecting to see big hits when scanning the filesystem for images and documents associated to each record, but surprisingly the (or maybe not) writes to the database were by far the worst offenders. I need to further investigate if it's the ORM which is causing the slow queries, or the transaction itself.
