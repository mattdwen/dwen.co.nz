---
layout: post
title: PHP memory management
date: 2013-01-21 17:13:09 +13:00
---
I've recently developed an API for importing data into the framework I've developed for [Xplore](http://www.xplore.net). The core API has multiple implementations which deal with different data sources, e.g. CSV or XML. This allows us write a single set of rules for the data, which the API then uses to translate the raw data into models using the framework ORM, giving me all the existing security, validation and logging. Seems easy enough, right?

I started to worry during initial development when the import was taking an extraordinarily long time. Right now I'm dealing with 1719 rows of data, over 53 columns; all up 586KB of data. Not a huge amount, but there are a lot of relationships in the data, and I'm hitting the file system looking for associated images for each record.

This is taking ~13 minutes on an i7 2Ghz with 8GB of ram. Ouch.

The initial automated imports were running fine in the production environment (better specs than above), but this with about 2/3's the current data (and there's more to come). The first run of this failed with an out of memory exception. Memory leak, I started to think.

Then I descended into the hell of PHP profiling and memory management.

I've been using [Jim Rubentein's PHP Profiler](https://github.com/jimrubenstein/php-profiler) (itself a port of [Sam Saffron's MiniProfiler](https://github.com/SamSaffron/MiniProfiler)). I'd had to disable this when executing this import, as the logging I had configured was creating out of memory exceptions on it's own, as I had it recording all the SQL requests. (I should really have disabled just the SQL logging at this stage, so I at least had consistant time based benchmarking.)

I was now starting to hunt around for alternative PHP memory profiling, and garbage collection. Xdebug was the obvious answer for the profiling, and fairly quickly I was generating profiling data for the import script (after a bit of fighting with the 3 different version of PHP which MAMP had installed, and finding the right config for the CLI).

I figured the memory leak would show up pretty quickly, so I reduced the data set down to only 10 rows, and started benchmarking. I started playing with disabling various functions, to try and see what was going where. By the time I'd disabled the entire import processing, and the profile trace was exactly the same as if I was running the complete import, I was thinking this is fishy. Xdebug's output includes every function which is called, and the memory used at that time. What was weird was no mention of the import functions were included anywhere in the output!

Because the framework uses the MVC pattern, I'm dynamically calling the controller methods, and passing the variables using **call_user_func_array**. It turns out that this is totally invisible to Xdebug. There's a few bugs logged around this, but no-one seems to have a solution.

Having discovered this, I bashed up a custom initialisation for the import API, which instantiated and called all the required methods directly. Presto, real data! A LOT of real data. I dropped the CSV down to only 10 lines of data, and profiled the following:

 - Initial baseline, with the existing code
 - No processing at all
 - Reading the CSV into memory
 - Utility clean up code
 - Full CSV line processing with forced GC

![](/img/2013/jan/V1_1024x512.png)

This scale is in bytes, so we're only talking ~5MB anyway. It seemed pretty clear in the baseline that the memory was getting recycled correctly. What's really weird is when I started manually triggering the garbage collection, the memory usage went up!

The other problem was I was getting 600,000 lines of metrics! Excel was, shall we say, struggling. I then ran the benchmark on the complete set of CSV data this morning. The profile data just shy of 7GB. Excel failed after about 1 million rows, which was less than 5% of the data as far as I could tell. Xdebug was giving me too data!

I then bashed up a quick and dirty memory profiler, where I could ask to tell me the memory used, when I wanted to know about it. I benchmarked my baseline code again, against all the forced garbage collection from earlier, using the full ~1700 rows:

![](/img/2013/jan/mempro_1_1024x512.png)

Can you see the difference? Obvious ramp up as I read each line from the CSV into memory, then a bit of fluctuation up and down as each line is processed. I scaled up the Y-axis to get a closer look for any differences:

![](/img/2013/jan/mempro_2_1024x512.png)

Yeah, nah. If there is a difference, it's barely registering into the KB. Note at this time, I measuring the total memory used by PHP, and not just by the executed script.

I wasn't actually sure that the my profiling was working at this stage, or that the GC was clearing anything. The [PHP documentation on garbage collection](http://php.net/manual/en/features.gc.performance-considerations.php) includes a script for simulating GC in action.
```
class Foo
{
  public $var = '3.1415962654';
}

$baseMemory = memory_get_usage();

for ( $i = 0; $i &lt;= 100000; $i++ )
{
  $a = new Foo;
  $a-&gt;self = $a;
  if ( $i % 500 === 0 )
  {
    echo sprintf( '%8d: ', $i ), memory_get_usage() - $baseMemory, "\n";
  }
}
```

*(I really hate the standard formatting of PHP btw.)*

I tweaked this to work with my own memory profiler (now incorporating excluding the base memory used, as above), and executed twice: once with **gc_disable();** and once with **gc_enable();**, and saw very similar results to the expected outcome. Yay, GC was working, as was my profiler!

![](/img/2013/jan/mempro_3_1024x512.png)

I also ran a third pass, where I forced garbage collection to execute after every iteration. The default GC is executed once the symbol table contains 100,000 records, hence the step pattern as it clears once read. By forcing GC the memory is cleared every loop, and never increases.

I then decided to run my import benchmarks again, using these three states, as I had not tested it with GC disabled. I was hoping to see another steadily increasing blue line, proving that GC was executing correctly.

![](/img/2013/jan/mempro_4_1024x512.png)

Nope, no change. I maged up the Y-axis again to be sure:

![](/img/2013/jan/mempro_5_1024x512.png)

Okay, maybe a little bit. Forcing GC to execute after every line is saving in the region of 215KB, out 18MB, so about 1.15%. Certainly nothing to write home about.

The problem is PHP garbage collection only deals with circular references, e.g. where more than one variable is referencing the same value. Everything else is cleared when the function exits anyway, as evidenced by the red trace floating up and down. GC is only taking care of the variables I'm not using very often anyway.

PHP also records memory used in two ways. When it require more memory, it requests a chunk bigger than required, so as to not annoy the system asking for more all the time. So PHP memory usage can be reported in either the total memory requested from the system, or what it's using within that allocation. I think this explains the larger step pattern in the data, as it goes to the system asking for more.

I was expecting the memory usage to creep up over time, as each line is being stored in various arrays detailing what's worked, what hasn't, and associated error messages. I was also hoping to see some run-away memory leak, which would explain the execution crashes on the server, that I could easily narrow down and fix. Unfortunately, I've proven that the code I've written is about as efficient as possible, and there's no glaring problems I can easily resolve.

Of course I can allocate more RAM and increase memory limits on the server, but that would be ignoring a more fundamental problem. I'm still worried about the CPU time as well, of which any memory management is only going to increase. It seems my plans of a standard API may be dashed, and I'm going to have to write bespoke code for every import. I shall benchmark this as I develop it as well.
