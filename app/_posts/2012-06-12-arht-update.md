---
layout: post
title: ARHT update
date: 2012-06-12 17:04:28 +13:00
---
Not dead, despite what many may wish. Been sick and rather busy.

Work on ARHT has been fragmented, and squeezed into gaps when I'm not working on DIVA. It is largely functional in terms of what it needs to do; only major missing component is the library, which I'm hoping to work on tonight.

I did create an installer for it using InstallShield light, but have had all sorts of issues with the results. I made some changes to include the "private" SQL CE 4 binaries, so it can run without need it explicitly installed. I was finding that it was including a reference to a different version of EntityFramework.dll though. Didn't have time to check what version were being included, so just hard copied over the one from the build directory. Also been hit and miss as to if it actually works on a machine. Tried it on a very non-dev laptop, and nothing happened, but it worked fine on the machine it's being built for. I have a suspicion it's still problems with SQL CE dependancies, but for now it works.
