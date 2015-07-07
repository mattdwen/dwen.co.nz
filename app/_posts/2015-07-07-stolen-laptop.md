---
layout: post
title:  "How to Handle Having Your Laptop Stolen"
date:   2015-07-07 12:36:04 +12:00
---

Over the weekend I had my laptop bag stolen.
The brazenness of someone walking up a driveway and into a corporate building on a Sunday afternoon still astounds me; that a good friend was on her own in a room right next to where it was taken is even more concerning.

At first, I thought I had just moved it somewhere and forgotten.
We spent nearly an hour looking before reporting it to the police, and I started locking down access.
The next day when I found my credit card had been used, it was almost a relief to confirm that it had been stolen.
Otherwise I would have forever been checking the building in the future for where I may have left it.

As part of all this I've learnt a few things about what to do immediately after - and how to better prepare for the inevitable.
Be it something stolen, forgotten, or destroyed, eventually most people will have to deal with recovering data, and possibly more importantly, ensure the bad guys can't get into your life.

## Luck

It's going to cut both ways.
That it happened at all I don't consider "bad luck".
You need to be prepared for some kind of loss at some stage in life.

![List of stolen items](/img/2015/stolen-list.jpg)

My bad luck was my bag was full of everything ready to get onto a plane that evening.
Wallet, watch, laptop, tablet, Kindle.
It was certainly a good score for the bastards.

My good luck: I had taken my car key out of my bag for some reason that morning, and had kept it in my pocket, along with my house keys.
I also have a wallet-type phone case where I keep my license and personal bank cards, so I had ID to get on the plane, and could get into my car after landing at home.

## Panic

The panic of what to do first can be quite overwhelming.
And the first thing that comes to your mind probably isn't going to be the thing to deal with first.

I wasn't worried about losing any data - I'm religious about backing up.

I also use a password manager, with unique passwords for everything.
I've got two-factor security enabled on everything that supports it.
My laptop has a password, so you can't just open it up and get into it.

Then I realised my wallet was in there.
I had my personal cards on me, in my pocket with my phone, but my business credit card was in there.
With my bank I can lock a card from my phone, so I did that immediately, and was confident that would be enough.

Most devices these days have location tracking, with software to handle exactly this situation.
I loaded up the **Find My Mac** site, only to find this laptop wasn't listed in there.

## The Weakest Link

Then I remembered my tablet was also in there, and I can track it's location too.

My tablet.

My tablet which wasn't locked, and was logged into just about everything.

Shit.

All my confidence that everything was secure and backed up vaporised.

The tablet wasn't showing it's location.
I'd disabled location tracking on it only weeks ago as it was logging data points all day long which conflicted with where my I actually was with my phone.

However, I could lock the device.
And it lets you set a lovely message for the bastard who's taken it.

## Security

Now I panic changed all the passwords I considered important, which fell into a few categories:

- Passwords that'll get you anywhere:
  - LastPass
  - Google
  - Microsoft
- Passwords that'll cost you money:
  - Banks
  - Airlines
  - Amazon
  - Steam
- Passwords that'll ruin your life:
 - GitHub
 - Dropbox
 - Facebook
 - Twitter (personal and business)
 - Apple
 - Xero

I also revoked ssh keys with everything relevant.

I doubt that the bastards will ever try and access my data, but it's not a risk that you can leave open.

## Backup

I'm better than most people I know with backups.
I have zero tolerance or sympathy for those that don't; it's simple and cheap today.

At most, the only real data I've lost is a few photo edits I've made in the last couple of weeks.
The photos themselves are still backed up, so it's just the metadata, which is stored on an external drive which was stolen.
I usually back up this drive once a month.

All of my computers run [CrashPlan](https://www.crashplan.com/), with real time backups to the cloud.
I also have two external hard drives which I cycle on a monthly basis, kept in separate buildings.
These drives handle my primary desktop computer, and my photo library.
I also have a NAS where all my photos and music go.

[BackBlaze](https://www.backblaze.com/) is a fantastic, cheap, backup solution.
The only reason I don't use it is that I know what I'm doing and have specific priorities when backing up.
BackBlaze just backs up your whole computer to the cloud, no questions asked.

## Devices

I now have a lock pattern on my phone.
This was by far my biggest downfall, with my phone and tablet.

I've used lock patterns in the past, but got lazy.
This was just outright negligent when considering the business implications.

Android now has a featured called **Smart Lock**, which disables the lock when in specific locations, or connected to specific devices.
This makes it much easier for when you're at home or in the office, and you only have to un-lock your phone when out and about.

That this system works with specific Bluetooth devices might just by an excuse to get an Android Wear watch.

### Tracking, Locking, and Erasing

I mentioned that my laptop wasn't showing in **Find My Mac**.
To be honest, it looks like I never registered it.

I did enable two-factor authentication with my Apple account a few months ago, which does break all iCloud logins.
It may just be that I never got around to signing back in on that laptop. Lazy, again.

I don't mind so much that my tablet wasn't showing it's location.
I just hope that the lock systems work.
This is something I'll test in the near future, just to give myself confidence.

I've now remote erased my tablet as well.
If it ever connects to the internet again it should automatically self destruct.

And I've deregistered my Kindle from my Amazon account.
Changing my Amazon password should have been sufficient to prevent purchases, but it's definitely impossible now.
I'm not convinced this was the right step though, as now it's like it never existed, and it's easier for the bastards to register with a new account.
It looks like Amazon's remote lock and wipe capabilities only apply to the Kindle Fire.

## Apps

A lot of apps track what devices they're registered to with your account.

E.g. from the Dropbox website I can see a list of devices which are trusted to sync, and remove them if they're no longer trusted.
I've gone through what I consider my "important" accounts and removed the trusted devices wherever possible.

[Authy](https://www.authy.com/) was the most important app here, as it manages all my two-factor authentication codes.
Again, I need to trust that removing the tablet as a registered device is going to cause the app to become non-operable.
But this relies on the tablet having reconnected to the internet first, so all the two-factor codes will continue to be generated while the tablet is offline.

I've only now checked the Authy settings, and found that I can set a pin to open the app.
This is now enabled on my phone.
I wish the app had prompted for this during initial setup.

You should regularly check what devices are registered with your applications; it's surprising what you can find still connected to your accounts.
Often when rebuilding computers, phones, or tablets you end up with duplicate registrations.
For example with Amazon Kindle I was up to "Matt's 9th Android Device"!

## Encryption

Something I haven't done, and am now looking into configuring everywhere.

Encryption is built into most devices and operating systems these days.
It's probably overkill for a purely personal device, but when there's sensitive business information involved, well, too late.

I'm a bit cautious with this, so will take my time to test and roll it out.
I can at least encrypt my virtual machines with little issues.
I'll wait until I have replacement tablet, and encrypt that out of the box.
Once that's setup then I'll encrypt my phone.

There were three external hard drives, as well as numerous USB keys stolen, all with various information on them.
These are a little bit harder, as the encryption needs to be platform agnostic.
I have a lot of installers and tools, which I need to be able to access quickly on any computer,
so perhaps it's best to partition it up and only encrypt some of it.

## Insurance

My insurance company has been great!
I had a number of invoices and serials, but no where near everything.

Buying things online makes it easier, as I had email receipts for a lot of items, but that didn't include serials.
I could also remember what stores I had bought items like sunglasses and wallet from.
I called the stores and they had records of my purchases, and have been great at provided receipt copies and even insurance replacement quotes.

My big ticket item, and most sentimental loss was my watch. I still had the original everything for this though! Box, manual, receipt, and guarantee card, so was well covered there.

I should have been keeping better track though.
It took me nearly two hours to find as much information as I could, which was still lacking.
In the event of a home fire, things would have been a lot more difficult.
We started a spreadsheet a few years ago when we moved across country, but it was woefully out of date.

My new plan involves this:
 - Spreadsheet of everything worth replacing
 - Photo/scan of receipt
 - Photo of item
 - Photo of serial number on item
 - All together on the cloud, not somewhere that will burn down with your house

Set a useful filename for the photos too, e.g. `MattWatch-receipt.jpg`, and `MattWatch-serial.jpg` so it's easy to find in a hurry.

The spreadsheet needs to contain:
  - Item
  - Manufacturer
  - Model
  - Serial
  - Description
  - Supplier
  - Purchase Date
  - Purchase Price
