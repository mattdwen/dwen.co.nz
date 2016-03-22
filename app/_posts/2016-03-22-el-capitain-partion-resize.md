---
layout: post
title:  "Resize the system partition on El Capitan"
date:   2016-03-22 15:33:00 +12:00
---

This may be specific to running OS X within a virtual machine, but I ran into some issues resizing the partition where OS X is installed.

I run a number of virtual machines for testing, and for whatever reason, I originally created my OS X 10.11 El Capitan VM with only a 40GB disk.
The 10.11.4 update dropped today, which I went to install, and after downloading was told there wasn't enough disk space to install the update.

"Easy!" I thought. "I've done this before."

Resizing a virtual disk with VMWare is easy, but you still need to resize the partition within the virtual machine once it has been expanded.

The new Disk Utility in El Capitan is a bit special.
While everything is technically still in there, it feels much harder to operate.

![The El Capitan Disk Utility](/img/2016/el-cap-resize/disk-util.png)
<em>The disk is showing the new 60GB capacity.</em>

What was really weird was that any option to resize the volume appeared to be disabled.

![No option to resize](/img/2016/el-cap-resize/cant-resize.png)
<em>But the volume is still 40GB, with no apparent free space.</em>

Instead, I had to turn to the `diskutil` command.

From Terminal, `diskutil list` shows me a list of all the disks and volumes in the system.

![diskutil list output](/img/2016/el-cap-resize/disk-list.png)

The disk (GUID_partition_scheme) is showing the 60GB total size, and the Macintosh HD volume is still 40GB.

There's a `resizeVolume` command which makes resizing really easy.
All you need to know is the name of the volume, and how much space you want to add (or remove).

It's even easier if you want to expand the volume to as big as it can go: you can use `R` as the size parameter, which uses all it can.

In the end my command was:

```
diskutil resizeVolume "Macintosh HD" R
```

You can also use the **IDENTIFIER** instead of the volume name.
In this case it would have been `disk0s2`, which you can see in the `diskutil list` output.

You get a nice little progress bar while it's expanding.
![Progress](/img/2016/el-cap-resize/resizing.png)

And afterwards, your new space is available without having to reboot.
![The new volume size](/img/2016/el-cap-resize/after-resize.png)

What's weird is now after the resize, back in the Disk Utility application, all the correct options to resize the volume are back again!
![Disk Utility is happy again](/img/2016/el-cap-resize/disk-util-after.png)
<em>I can drag the partition marker now, and choose to add a new partition.</em>
