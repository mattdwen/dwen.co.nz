---
layout: post
title: PHP CSV import Mk.III
date: 2013-01-23 17:16:10 +13:00
---
The third version of the importer bypasses the ORM, but still uses the database layer that I have, which at least protects and escapes the SQL.

Finally, a marked improvement in memory usage:

![](/content/images/2014/Jan/DB1.png)

An average saving of 1.3MB, which is respectable I guess. What was really awesome was the time saved:

>11m58s vs 11m49s vs 1m07s

I'll take that! Don't use an ORM I guess. Of course this means I'm now ignoring all the model validation, which doesn't fill me with confidence.
